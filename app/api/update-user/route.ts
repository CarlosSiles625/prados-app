import { updateUser } from "@/services/user";

export async function POST(req: Request) {
  const body = await req.json();
  const { message, ok } = await updateUser(body.id, body);
  return Response.json({ message, ok });
}
