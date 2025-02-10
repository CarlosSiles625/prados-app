import prisma from "@/lib/db";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: Request) {
  try {
    const interns = await prisma.intern.findMany();
    if (!interns) throw new Error("No hay datos para exportar");

    // Serializar BigInt a string
    const serializedInterns = JSON.parse(
      JSON.stringify(interns, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return Response.json({
      ok: true,
      interns: serializedInterns,
      error: null,
    });
  } catch (error) {
    console.log("Error en la exportación:", error);
    return Response.json({ ok: false, error, interns: null });
  }
}
