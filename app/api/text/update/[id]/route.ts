import { updateTextById } from "@/services/text";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  const { id } = await params;
  const resp = await updateTextById(Number(id), body.textHtml);
  return Response.json(resp);
}
