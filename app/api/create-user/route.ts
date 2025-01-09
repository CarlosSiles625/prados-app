import { createUser } from "@/services/user";

export async function POST(req: Request) {
  const { name, cedula, password } = await req.json();
  const { ok, message } = await createUser({ name, cedula, password });
  return Response.json({ ok, message });
}
