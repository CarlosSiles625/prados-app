import prisma from "@/lib/db";
import { Text } from "@/types/text";

export async function getTexts() {
  try {
    const texts = await prisma.textos.findMany();
    return { texts: texts as unknown as Text[], error: null };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return { error: error.message, texts: null };
    } else {
      console.error(error);
      return { error: "error desconocido", texts: null };
    }
  }
}
