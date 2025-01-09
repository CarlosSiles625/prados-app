import { UserType } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "@formkit/tempo";
import Link from "next/link";

export const userColumns: ColumnDef<UserType & { acction: string }>[] = [
  {
    accessorKey: "created_at",
    header: "Fecha de registro",
    cell: ({ row }) => format(row.original.created_at, "medium", "es"),
  },
  {
    accessorKey: "cedula",
    header: "Cédula",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => row.original.role?.display_name,
  },
  {
    accessorKey: "acction",
    header: "Acciones",
    cell: ({ row }) => (
      <Link href={`/dashboard/users/${row.original.id}`}>Ver</Link>
    ),
  },
];
