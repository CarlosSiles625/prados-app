/* eslint-disable @typescript-eslint/no-explicit-any */

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { UserType } from "@/types/user";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function setSession(user: UserType): Promise<boolean> {
  try {
    if (!user || !user.id) {
      throw new Error("Datos de usuario inválidos.");
    }

    // Configurar el almacén de cookies
    const cookiesStore = await cookies();

    // Calcular la expiración de la sesión
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Encriptar los datos de sesión
    const session = await encrypt({ user, expires });

    // Configurar opciones seguras para la cookie
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
      httpOnly: true,
      sameSite: "strict" as const, // Prevenir ataques CSRF
    };

    // Guardar la sesión en una cookie
    cookiesStore.set("session", session, cookieOptions);

    return true;
  } catch (error) {
    console.error("Error en la función login:", error);
    throw new Error("Error al iniciar sesión");
  }
}

export async function logout() {
  // Destroy the session
  const cookiesStore = await cookies();
  cookiesStore.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const cookiesStore = await cookies();
  const session = cookiesStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;
  try {
    // Intenta descifrar el token existente
    const parsed = await decrypt(session);

    // Verifica si el token está próximo a expirar
    const now = Math.floor(Date.now() / 1000);
    const exp = parsed.exp as number; // "exp" está en segundos

    if (exp - now < 60 * 60 * 24) {
      // Si faltan menos de 1 día
      // Renueva el token con una nueva fecha de expiración
      const refreshedToken = await encrypt({
        ...parsed,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      const res = NextResponse.next();
      res.cookies.set({
        name: "session",
        value: refreshedToken,
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
        sameSite: "strict" as const,
      });

      return res;
    }
  } catch (error) {
    console.error("Error al descifrar el token:", error);
    // Si el token ha expirado o es inválido, maneja la sesión (ejemplo: redirigir a login)
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
