/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type InternsQuery = {
  limit?: number;
  page?: number;
  q?: string;
  searchBy?: "name" | "cedula";
};

function buildWhereClause(
  q?: string,
  searchBy?: "name" | "cedula"
): Record<string, any> {
  if (!q || !searchBy) return {};

  if (searchBy === "name") {
    return { name: { contains: q } };
  }

  const cedula = Number(q);
  if (isNaN(cedula)) {
    throw new Error("Invalid search query for 'cedula'. It must be a number.");
  }

  return { cedula: { equals: cedula } };
}

export async function getInterns({
  limit = 10,
  page = 1,
  q,
  searchBy,
}: InternsQuery) {
  try {
    // Validate inputs
    if (page < 1)
      throw new Error("Page number must be greater than or equal to 1.");
    if (limit < 1) throw new Error("Limit must be greater than or equal to 1.");

    // Build the where clause for filtering
    const where = buildWhereClause(q, searchBy);

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch data with filtering and pagination
    const [interns, count] = await Promise.all([
      prisma.intern.findMany({
        where,
        select: {
          id: true,
          interned_at: true,
          name: true,
          cedula: true,
          birthdate: true,
          born_place: true,
          status: true,
          user: {
            select: {
              name: true,
            },
          },
        },
        skip,
        take: limit,
      }),
      prisma.intern.count({ where }),
    ]);

    return { interns, count, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error(errorMessage);
    return { interns: null, count: 0, error: errorMessage };
  }
}

export async function getInternById(id: string) {
  try {
    const intern = await prisma.intern.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    if (!intern) throw new Error("No se encontró el interno");
    return { intern, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.log(errorMessage);
    return { intern: null, error: errorMessage };
  }
}

export async function updateIntern(id: string, data: Prisma.InternUpdateInput) {
  try {
    const newIntern = await prisma.intern.update({
      where: { id },
      data,
    });
    if (!newIntern) throw new Error("No se pudo actualizar el interno");
    return { ok: true, message: "Interno actualizado con éxito" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return { ok: false, message: error.message };
    } else {
      console.log("An unexpected error occurred");
      return { ok: false, message: "An unexpected error occurred" };
    }
  }
}

export async function deleteIntern(id: string) {
  try {
    const intern = await prisma.intern.delete({
      where: {
        id,
      },
    });
    if (!intern) throw new Error("No se pudo eliminar el interno");
    return { ok: true, message: "Interno eliminado con éxito" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return { ok: false, message: error.message };
    } else {
      console.log("An unexpected error occurred");
      return { ok: false, message: "An unexpected error occurred" };
    }
  }
}
