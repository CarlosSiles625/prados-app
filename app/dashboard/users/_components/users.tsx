import prisma from "@/lib/db";

import { UserType } from "@/types/user";
import { UsersTable } from "./table/users-table";

export async function Users() {
  const data = await prisma.user.findMany({
    where: {
      role: {
        name: {
          not: "ADMIN",
        },
      },
    },
    select: {
      id: true,
      cedula: true,
      name: true,
      created_at: true,
      email: true,
      role: true,
    },
  });
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      <h2 className="font-semibold text-xl">Lista de usuarios del sistema</h2>
      <UsersTable data={data as unknown as UserType[]} />
    </div>
  );
}
