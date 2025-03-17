import { updateIntern } from "@/services/interns";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const { id } = await params;
  const resp = await updateIntern(id, body);
  return Response.json(resp);
}
