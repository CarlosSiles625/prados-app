/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/db";
import { importInternsFromExcel } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    if (!file) throw new Error("No se ha enviado un archivo");
    if (!userId) throw new Error("No se ha enviado un usuario");
    const buffer = Buffer.from(await file.arrayBuffer());
    const interns = await importInternsFromExcel(buffer, userId);
    const resp = await prisma.intern.createMany({
      data: interns.map((intern) => ({
        id: intern.id,
        name: intern.name,
        birthdate: intern.birthdate,
        born_place: intern.born_place,
        cedula: parseInt(intern.cedula, 10),
        interned_at: intern.interned_at,
        isRural: intern.isRural,
        user_id: userId,
        adiccions: intern.adiccions,
        career: intern?.career,
        created_at: intern.created_at,
        direction: intern.direction,
        education: intern.education,
        marital_status: intern.marital_status,
        phone: intern.phone,
        finished_program: intern.finished_program,
        gender: intern.gender,
        guarantor_address: intern.guarantor_address,
        guarantor_cedula: intern.guarantor_cedula
          ? parseInt(intern.guarantor_cedula, 10)
          : null,
        guarantor_name: intern.guarantor_name,
        guarantor_phone: intern.guarantor_phone,
        image: null,
        ocupation: intern.ocupation,
        out_at: intern.out_at,
        references: intern.references,
        out_properties: intern.out_properties as any,
        profession: intern.profession,
        status: intern.status,
        talents: intern.talents,
      })),
    });
    console.log(resp);
    return Response.json({ ok: true, error: null });
  } catch (error) {
    console.log(error);
    return Response.json({ error, ok: false });
  }
}
// TODO: Implementar la importación de los internos
