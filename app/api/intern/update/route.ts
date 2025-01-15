import { updateIntern } from "@/services/interns";

export async function POST(req: Request) {
  const body = await req.json();
  const id = body.id;
  const resp = await updateIntern(id, body);
  return Response.json(resp);
}
