import prisma from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;
  // Borrar usuario
  const user = await prisma.user.delete({
    where: { id },
  });
  if (!user) {
    return Response.json({
      ok: false,
      message: "Error al eliminar el usuario",
    });
  }
  return Response.json({ ok: true });
}
