import path from "node:path";
import { promises as fs } from "fs";
import { getInternById, updateIntern } from "@/services/interns";

export async function POST(req: Request) {
  const formData = await req.formData();
  const internId = formData.get("internId") as string;
  const file = formData.get("internImg") as File;
  if (!file)
    return Response.json(
      { error: "No hay archivo en la solicitud." },
      { status: 400 }
    );

  const data = await getInternById(internId);
  if (!data.intern || data.error)
    return Response.json(
      { error: "No se encontró el interno." },
      { status: 404 }
    );

  if (data.intern.image) {
    const uploadDir = path.join(process.cwd(), "public");
    const filePath = path.join(uploadDir, data.intern.image);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      // Solo manejamos el error si NO es de "archivo no encontrado"
      if (error.code !== "ENOENT") {
        console.error(error);
        return Response.json(
          {
            error:
              "Ocurrió un error inesperado al eliminar la imagen anterior.",
          },
          { status: 500 }
        );
      }
      // Si el error es ENOENT (archivo no existe), continuamos normalmente
      console.log("La imagen anterior no existía, continuando...");
    }
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public/interns");

  try {
    await fs.mkdir(uploadDir, { recursive: true });
    const ext = file.name.split(".").pop();
    const filePath = path.join(uploadDir, `${internId}.${ext}`);

    await fs.writeFile(filePath, buffer);
    const { ok } = await updateIntern(internId, {
      image: `${internId}.${ext}`,
    });
    if (!ok)
      return Response.json(
        { error: "No se pudo actualizar la imagen del interno." },
        { status: 500 }
      );
    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Ocurrió un error inesperado al subir la imagen." },
      { status: 500 }
    );
  }
}
