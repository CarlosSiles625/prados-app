"use server";
import prisma from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { setSession } from "@/lib/auth";
import { UserType } from "@/types/user";
export async function loginAction(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const cedula = Number(formData.get("cedula"));
    const password = String(formData.get("password"));
    const parseData = z
      .object({ cedula: z.number(), password: z.string() })
      .safeParse({
        cedula,
        password,
      });
    if (!parseData.success) {
      return "error al iniciar sesión";
    }
    const user = await getUserbyCedula(parseData.data.cedula);
    if (!user) {
      return "Cédula incorrecta";
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return "Contraseña incorrecta";
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _removed, ...userData } = user;
    await setSession(userData as unknown as UserType);
    return "success";
  } catch (error) {
    console.log(error);
    return "Error al iniciar sesión, intente nuevamente";
  }
}

async function getUserbyCedula(cedula: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { cedula },
      include: { role: true },
    });
    return user;
  } catch (e) {
    console.log(e);
    // throw new Error("DATOS_INVALIDOS");
  }
}
