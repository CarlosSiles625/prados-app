import prisma from "@/lib/db";
import { UserEditPage } from "./edit-user";
import { UserType } from "../../../../types/user";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; //next js 15
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      role: true,
      cedula: true,
      created_at: true,
      id: true,
    },
  });
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <UserEditPage user={user as unknown as UserType} />
    </div>
  );
}
