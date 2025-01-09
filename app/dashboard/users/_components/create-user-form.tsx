"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserForm, UserSchema } from "@/schemas/user";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateUserForm() {
  const router = useRouter();
  const form = useForm<UserForm>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const cedula = form.watch("cedula");
  const onSubmit = async (data: UserForm) => {
    const resp = await fetch("/api/create-user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = (await resp.json()) as { ok: boolean; message: string };
    if (json.ok) {
      toast.success(json.message);
      form.reset();
      router.refresh();
    } else {
      toast.error(json.message);
    }
  };

  return (
    <Form {...form}>
      <form
        action=""
        className="space-y-2 mt-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan Perez" {...field} />
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
              <FormLabel>Carnet de Indentidad</FormLabel>
              <FormControl>
                <Input type="number" {...field} value={cedula ?? ""} />
              </FormControl>
              <FormMessage />
              <FormDescription>Se usa para iniciar sesión.</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Debe contener al menos 6 caracteres.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Registrar</Button>
      </form>
    </Form>
  );
}
