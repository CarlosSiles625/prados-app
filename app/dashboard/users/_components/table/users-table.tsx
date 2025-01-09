"use client";

import { UserType } from "@/types/user";

import { userColumns } from "./columns";
import { DataTable } from "@/components/data-table";

type DataType = UserType & { acction: string };
export function UsersTable({ data }: { data: UserType[] }) {
  return (
    <DataTable columns={userColumns} data={data as unknown as DataType[]} />
  );
}
