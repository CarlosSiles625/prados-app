/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { internSchema, InternSchema } from "@/schemas/intern";
import { Adicction, Direction, Reference } from "@/types/intern";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formatReferences } from "@/lib/utils";
import { useSession } from "@/context/session-context";
import { toast } from "sonner";
import { DEPARTAMENTS, OCCUPATIONS, PROFESSIONS } from "@/constants/intern";
import { AdicctionTable } from "../../adiction-table";
import { Intern } from "@prisma/client";
import { useRouter } from "next/navigation";

// interface Intern {
//   id: string;
//   name: string;
//   birthdate: string;
//   born_place: {
//     departamento: string;
//     ciudad: string;
//   };
//   interned_at: string;
//   cedula: number;
//   phone: string;
//   marital_status: string;
//   profession: string;
//   ocupation: string;
//   guarantor_name: string;
//   guarantor_phone: string;
//   guarantor_cedula: number;
//   guarantor_address: string;
//   references: Reference[];
//   direction: Direction;
//   talents: string[];
//   education: {
//     primary: boolean;
//     secondary: boolean;
//     university: boolean;
//   };
//   career: string;
//   gender: string;
//   isRural: boolean;
//   adiccions: Adicction[];
// }

interface EditInternFormProps {
  intern: Intern;
}

export function EditInternForm({ intern }: EditInternFormProps) {
  const session = useSession();
  const router = useRouter();
  const [isRural, setIsRural] = useState(intern.isRural || false);
  const [adicctions, setAdictions] = useState<Adicction[]>(
    (intern.adiccions as any) || []
  );
  const [departament, setDepartament] = useState(
    (intern.born_place as any).departamento || "Chuquisaca"
  );
  const [isM, setIsM] = useState(intern.gender === "M");

  // Formatear referencias para el campo de texto
  const referencesStr = intern.references
    ? intern.references
        .map((ref: any) => `${ref.phone}-${ref.name}-${ref.relationship}`)
        .join(",")
    : "";

  // Formatear talentos para el campo de texto
  const talentsStr = Array.isArray(intern.talents)
    ? intern.talents.join(",")
    : "";

  const form = useForm<InternSchema>({
    defaultValues: {
      name: intern.name || "",
      birthdate: intern.birthdate
        ? new Date(intern.birthdate).toISOString().split("T")[0]
        : "",
      born_place: (intern.born_place as any)?.ciudad || "",
      interned_at: intern.interned_at
        ? new Date(intern.interned_at).toISOString().split("T")[0]
        : "",
      cedula: intern.cedula?.toString() || "",
      phone: intern.phone || "",
      marital_status: intern.marital_status || "",
      profession: intern.profession || "",
      ocupation: intern.ocupation || "",
      guarantor_name: intern.guarantor_name || "",
      guarantor_phone: intern.guarantor_phone || "",
      guarantor_cedula: intern.guarantor_cedula?.toString() || "",
      guarantor_street: intern.guarantor_address || "",
      references: referencesStr,
      street: (intern.direction as any)?.street || "",
      zone: (intern.direction as any)?.zone || "",
      city: (intern.direction as any)?.city || "",
      talents: talentsStr,
      primary: (intern.education as any)?.primary || false,
      secondary: (intern.education as any)?.secondary || false,
      university: (intern.education as any)?.university || false,
      career: intern.career || "",
    },
    resolver: zodResolver(internSchema),
  });

  const onSubmit = async (data: InternSchema) => {
    if (!session) return;
    try {
      const references: Reference[] = formatReferences(data.references);
      const direction: Direction = {
        street: data.street,
        zone: data.zone,
        city: data.city,
      };
      const education = {
        primary: Boolean(data.primary),
        secondary: Boolean(data.secondary),
        university: Boolean(data.university),
      };

      const internData = {
        name: data.name,
        phone: data.phone,
        marital_status: data.marital_status,
        ocupation: data.ocupation ?? "Sin ocupación",
        profession: data.profession ?? "Sin profesión",
        guarantor_name: data.guarantor_name,
        guarantor_address: data.guarantor_street,
        guarantor_phone: data.guarantor_phone,
        guarantor_cedula: parseInt(data.guarantor_cedula, 10),
        cedula: parseInt(data.cedula, 10),
        isRural,
        birthdate: new Date(data.birthdate).toISOString(),
        born_place: {
          departamento: departament,
          ciudad: data.born_place,
        },
        direction: direction as any,
        references: references as any,
        education: education as any,
        gender: isM ? "M" : "F",
        adiccions: adicctions as any,
        career: data.career,
        interned_at: data.interned_at
          ? new Date(data.interned_at).toISOString()
          : new Date().toISOString(),
        talents: data.talents.split(","),
      };

      const resp = await fetch(`/api/intern/update/${intern.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(internData),
      });

      const json = await resp.json();

      if (!json.ok) {
        toast.error(json.message || "Error al actualizar interno");
        return;
      }

      toast.success(json.message || "Interno actualizado exitosamente");
      router.refresh();
    } catch (error) {
      console.error("Error updating intern:", error);
      toast.error("Error al actualizar los datos del interno");
    }
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-screen-lg flex flex-col space-y-2 mt-2 p-4 border border-gray-200 rounded shadow-md"
      >
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cedula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cédula</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Label>Sexo</Label>
            <div className="flex justify-between p-4">
              <div className="flex items-center justify-center gap-2">
                <Input
                  type="radio"
                  name="sexo"
                  value="M"
                  checked={isM}
                  className="w-4 h-4"
                  onChange={() => setIsM(true)}
                />
                <Label htmlFor="Masculino">Masculino</Label>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Input
                  type="radio"
                  name="sexo"
                  value="F"
                  checked={!isM}
                  className="w-4 h-4"
                  onChange={() => setIsM(false)}
                />
                <Label htmlFor="Femenino">Femenino</Label>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 ">
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label>Lugar de Nacimiento</Label>
            <Select
              onValueChange={(v) => setDepartament(v)}
              defaultValue={departament}
              value={departament}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Departamentos</SelectLabel>
                  {DEPARTAMENTS.map((dep) => (
                    <SelectItem key={dep.id} value={dep.name}>
                      {dep.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <FormField
              control={form.control}
              name="born_place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localidad</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2 mt-2">
              <Label htmlFor="isRural">Es rural?</Label>
              <Input
                type="checkbox"
                name="isRural"
                className="h-4 w-4"
                checked={isRural}
                onChange={() => setIsRural(!isRural)}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marital_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Civil</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Estado civil</SelectLabel>
                        <SelectItem value="Soltero/a">Soltero/a</SelectItem>
                        <SelectItem value="Casado/a">Casado/a</SelectItem>
                        <SelectItem value="Viudo/a">Viudo/a</SelectItem>
                        <SelectItem value="Divorciado/a">
                          Divorciado/a
                        </SelectItem>
                        <SelectItem value="Concubinato">Concubinato</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interned_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Internación</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="references"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referencias</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Formato Teléfono-Nombre-Relación y estar separada por comas.
                Ejemplo: 734734-Roberto Perez-Hermano,455534-Carlos Siles
                Vedia-Padre
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-4 place-items-center gap-2">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calle</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zona</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-1">
            <FormField
              control={form.control}
              name="primary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primaria</FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      {...field}
                      checked={field.value}
                      value={undefined}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secundaria</FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      {...field}
                      checked={field.value}
                      value={undefined}
                      className="h-4 w-4"
                      onChange={() => {
                        field.onChange(!field.value);
                        form.setValue("primary", true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Universidad</FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      {...field}
                      checked={field.value}
                      value={undefined}
                      className="h-4 w-4"
                      onChange={() => {
                        field.onChange(!field.value);
                        form.setValue("secondary", true);
                        form.setValue("primary", true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="career"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carrera</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>Llenar si es universitario/a</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profesión</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger disabled={form.watch("career") !== ""}>
                      <SelectValue placeholder="Seleccione una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Profesiones</SelectLabel>
                        {PROFESSIONS.map((prof) => (
                          <SelectItem key={prof.id} value={prof.name}>
                            {prof.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ocupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ocupación</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger
                      disabled={
                        form.watch("profession") !== "Sin profesión" &&
                        form.watch("profession") !== ""
                      }
                    >
                      <SelectValue placeholder="Seleccione una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Ocupaciones</SelectLabel>
                        {OCCUPATIONS.map((occ) => (
                          <SelectItem key={occ.id} value={occ.name}>
                            {occ.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="talents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Talentos</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Debe separar los talentos por comas.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="guarantor_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del garante</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guarantor_cedula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cédula del garante</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guarantor_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono del Garante</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guarantor_street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección del garante</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full grid place-content-center ">
          <AdicctionTable adicctions={adicctions} setAdictions={setAdictions} />
        </div>
        <div className="flex justify-center gap-4">
          <Button type="submit" className="self-center">
            Actualizar
          </Button>
        </div>
      </form>
    </Form>
  );
}
