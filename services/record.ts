import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getRecordByInternId(internId: string) {
  try {
    const [records, count] = await Promise.all([
      prisma.historial.findMany({
        where: {
          intern_id: internId,
        },
        include: {
          user: true,
        },
        orderBy: {
          created_at: "desc",
        },
      }),
      prisma.historial.count({
        where: { intern_id: internId },
      }),
    ]);
    if (!records) throw new Error("No se encontraron registros");
    return { records, count, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { records: null, count: null, error: error.message };
    }
    return { records: null, count: null, error: "Error desconocido" };
  }
}

export async function createRecord(data: Prisma.HistorialCreateInput) {
  try {
    const record = await prisma.historial.create({
      data,
    });
    if (!record) throw new Error("No se pudo crear el registro");
    return { ok: true, message: "Registro creado con éxito" };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: "Error desconocido" };
  }
}
