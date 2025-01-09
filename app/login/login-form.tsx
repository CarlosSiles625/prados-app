"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useState } from "react";
import { loginAction } from "./action";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [state, formAction, isLoading] = useActionState(loginAction, undefined);
  console.log(state);
  useEffect(() => {
    if (state === "success") {
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <form className="space-y-4" action={formAction}>
      <div>
        <Label htmlFor="cedula">Cédula</Label>
        <Input id="cedula" type="number" name="cedula" />
      </div>
      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type={show ? "text" : "password"}
          name="password"
        />
        <Button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="text-xs mt-1 text-gray-500"
          size={"sm"}
          variant="ghost"
        >
          {show ? "Ocultar" : "Mostrar"}
        </Button>
      </div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <Button type="submit" className="w-full">
          Iniciar sesión
        </Button>
      )}
      {state && state !== "success" && (
        <p className="text-center text-red-500 text-sm">{state}</p>
      )}
    </form>
  );
}
