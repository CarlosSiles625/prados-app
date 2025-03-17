import prisma from "@/lib/db";

export async function GET() {
  try {
    const texts = await prisma.textos.findMany();
    return Response.json({ texts });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
