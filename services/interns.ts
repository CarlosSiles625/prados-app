import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createIntern(data: Prisma.InternCreateInput) {
  try {
    const intern = await prisma.intern.create({
      data,
    });
    if (!intern) throw new Error("No se pudo registrar el interno");
    return { ok: true, message: "Interno registrado con éxito" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return { ok: false, message: error.message };
    }
  }
}
