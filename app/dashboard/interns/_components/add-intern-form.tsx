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
import { AdicctionTable } from "./adiction-table";
import { formatReferences } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { useSession } from "@/context/session-context";
import { toast } from "sonner";

export function AddInterForm() {
  const session = useSession();
  const form = useForm<InternSchema>({
    defaultValues: {
      name: "",
      birthdate: "",
      born_place: "",
      cedula: "",
      phone: "",
      marital_status: "",
      profession: "",
      ocupation: "",
      guarantor_name: "",
      references: "",
      street: "",
      zone: "",
      city: "",
      talents: "",
      primary: false,
      secondary: false,
      university: false,
    },
    resolver: zodResolver(internSchema),
  });

  const [isRural, setIsRural] = useState(false);
  const [adicctions, setAdictions] = useState<Adicction[]>([]);
  const [isM, setIsM] = useState(true);

  const onSubmit = async (data: InternSchema) => {
    if (!session) return;
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
    const intertData: Prisma.InternCreateInput = {
      name: data.name,
      phone: data.phone,
      marital_status: data.marital_status,
      ocupation: data.ocupation,
      profession: data.profession,
      guarantor_name: data.guarantor_name,
      cedula: parseInt(data.cedula, 10),
      isRural,
      birthdate: new Date(data.birthdate).toISOString(),
      born_place: {
        departamento: data.born_place.split(",")[0],
        ciudad: data.born_place.split(",")[1],
      },
      direction: direction as any,
      references: references as any,
      education: education as any,
      gender: isM ? "M" : "F",
      adiccions: adicctions as any,
      interned_at: new Date().toISOString(),
      talents: data.talents.split(","),
      user: { connect: { id: session.user.id } },
    };

    const resp = await fetch("/api/intern/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(intertData),
    });
    const Json = await resp.json();
    if (!Json.ok) {
      toast.error(Json.message);
      return;
    }
    toast.success(Json.message);
    form.reset();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 mt-2 p-4 border border-gray-200 rounded shadow-md"
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
                  onChange={() => setIsM(!isM)}
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
                  onChange={() => setIsM(!isM)}
                />
                <Label htmlFor="Femenino">Femenino</Label>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
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
          <FormField
            control={form.control}
            name="born_place"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Lugar de Nacimiento</FormLabel>
                <FormControl>
                  <div>
                    <Input {...field} />
                    <div className="flex items-center gap-2">
                      <Label htmlFor="isRural">Es rural?</Label>
                      <Input
                        type="checkbox"
                        name="isRural"
                        className="h-4 w-4"
                        onChange={() => setIsRural(!isRural)}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Departamento,Localidad </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
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
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profesión</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
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
                  <Input type="text" {...field} />
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
        </div>

        <div className="w-full grid place-content-center ">
          <AdicctionTable adicctions={adicctions} setAdictions={setAdictions} />
        </div>
        <Button type="submit" className="self-center">
          Registrar
        </Button>
      </form>
    </Form>
  );
}
