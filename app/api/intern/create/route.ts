import { createIntern } from "@/services/interns";

export async function POST(req: Request) {
  const body = await req.json();
  const resp = await createIntern(body);
  return Response.json(resp);
}
