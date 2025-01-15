/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BornPlace, Direction } from "@/types/intern";
import { Intern, Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditFormType {
  name: string;
  cedula: string;
  phone: string;
  bornplace: string;
  isRural: boolean;
  birthday: string;
  address: string;
  profession: string;
  ocupation: string;
  talents: string;
}

export function EditForm({ intern }: { intern: Intern }) {
  const bornPlace = intern.born_place as unknown as BornPlace;
  const address = intern.direction as unknown as Direction;
  const router = useRouter();
  const form = useForm<EditFormType>({
    defaultValues: {
      name: intern.name,
      cedula: String(intern.cedula),
      phone: intern.phone || "",
      bornplace: `${bornPlace.departamento}, ${bornPlace.ciudad}`,
      birthday: intern.birthdate.toISOString().split("T")[0],
      address: `${address.street}, ${address.zone}, ${address.city}`,
      profession: intern.profession ?? "",
      ocupation: intern.ocupation ?? "",
      talents: intern.talents.join(", ") ?? "",
    },
  });
  const onSubmit = async (data: EditFormType) => {
    const born_place: BornPlace = {
      departamento: data.bornplace.split(",")[0],
      ciudad: data.bornplace.split(",")[1].trim(),
    };
    const direction: Direction = {
      street: data.address.split(",")[0],
      zone: data.address.split(",")[1].trim(),
      city: data.address.split(",")[2].trim(),
    };
    const talents = data.talents.split(",").map((talent) => talent.trim());
    const dataToUpdate: Prisma.InternUpdateInput = {
      name: data.name,
      phone: data.phone,
      birthdate: new Date(data.birthday).toISOString(),
      cedula: parseInt(data.cedula, 10),
      profession: data.profession,
      ocupation: data.ocupation,
      born_place: born_place as any,
      direction: direction as any,
      talents,
      isRural: data.isRural,
    };
    const resp = await fetch("/api/intern/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: intern.id, ...dataToUpdate }),
    });
    const json = await resp.json();
    if (!json.ok) {
      toast.error(json.message);
      return;
    }
    toast.success("Interno actualizado");
    router.refresh();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 max-w-screen-lg mx-auto p-4 rounded-lg bg-white shadow"
      >
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cedula"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Cédula</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Celular</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <FormField
              control={form.control}
              name="bornplace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Lugar de nacimiento
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Label>
              Es rural?
              <Input
                type="checkbox"
                defaultChecked={intern.isRural}
                {...form.register("isRural")}
                className="w-4 h-4"
              />
            </Label>
          </div>
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Fecha de Nacimiento
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Dirección</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Profeción</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ocupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Ocupación</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="talents"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Talentos</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="self-center">
          Actualizar
        </Button>
      </form>
    </Form>
  );
}
