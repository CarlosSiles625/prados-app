import prisma from "@/lib/db";
import { Text, TextType } from "@/types/text";

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

export async function getTextByType(type: TextType) {
  try {
    const text = await prisma.textos.findFirst({
      where: {
        name: type,
      },
    });
    if (!text) throw new Error("No se encontró el texto");
    return { text: text as unknown as Text, error: null };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return { error: error.message, text: null };
    } else {
      console.error(error);
      return { error: "error desconocido", text: null };
    }
  }
}

export async function updateTextById(id: number, textHtml: string) {
  try {
    const text = await prisma.textos.update({
      where: {
        id,
      },
      data: {
        textHtml,
      },
    });
    return { text: text as unknown as Text, ok: true };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return { error: error.message, ok: false };
    } else {
      console.error(error);
      return { error: "error desconocido", ok: false };
    }
  }
}

export async function updateText(id: number, textHtml: string) {
  const resp = await fetch(`/api/text/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ textHtml }),
  });
  return await resp.json();
}
