"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { UserType } from "../../../../types/user";
import { useRouter } from "next/navigation";

// Esquema para validar solo las contraseñas
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type Props = {
  user: UserType;
};

export function UserEditPage({ user }: Props) {
  const router = useRouter();
  // Formulario para los datos generales (sin esquema)
  const formData = useForm({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      cedula: user.cedula || undefined,
    },
  });

  // Formulario para la contraseña (con esquema)
  const formPassword = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Manejar envío de datos generales
  async function onSubmitData(values: Partial<UserType>) {
    const resp = await fetch("/api/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id, ...values }),
    });
    const json = await resp.json();
    if (!json.ok) {
      toast.error("Error al actualizar los datos generales");
      return;
    }
    toast.success("Datos generales actualizados exitosamente");
  }

  // Manejar envío de la contraseña
  async function onSubmitPassword(values: z.infer<typeof passwordSchema>) {
    const { password } = values;
    const dataToSend = {
      id: user.id,
      password,
      name: user.name,
      email: user.email,
    };
    const resp = await fetch("/api/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    const json = await resp.json();
    if (!json.ok) {
      toast.error("Error al actualizar la contraseña");
      return;
    }
    toast.success("Contraseña actualizada exitosamente");
  }

  async function onDeleteUser(e: React.FormEvent) {
    e.preventDefault();
    const resp = await fetch("/api/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id }),
    });
    const json = await resp.json();
    if (!json.ok) {
      toast.error("Error al eliminar el usuario");
      return;
    }
    toast.success("Usuario eliminado exitosamente");
    router.push("/dashboard/users");
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Editar Perfil de Usuario</CardTitle>
        <CardDescription>
          Actualiza los datos personales y la contraseña del usuario aquí.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Formulario para datos generales */}
        <Form {...formData}>
          <form
            onSubmit={formData.handleSubmit(onSubmitData)}
            className="space-y-8"
          >
            <FormField
              control={formData.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formData.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formData.control}
              name="cedula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cédula</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Actualizar Datos</Button>
          </form>
        </Form>

        {/* Formulario para la contraseña */}
        <Form {...formPassword}>
          <form
            onSubmit={formPassword.handleSubmit(onSubmitPassword)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={formPassword.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nueva contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formPassword.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirmar nueva contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Actualizar Contraseña</Button>
          </form>
        </Form>
        <form onSubmit={onDeleteUser}>
          <Button type="submit" variant="destructive">
            Eliminar Usuario
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
