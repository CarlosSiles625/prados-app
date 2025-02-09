import { ColumnDef } from "@tanstack/react-table";
import { format } from "@formkit/tempo";
import Link from "next/link";
import { InternsType } from "@/types/intern";

export const columns: ColumnDef<InternsType & { acction: string }>[] = [
  {
    accessorKey: "cedula",
    header: "Cédula",
  },
  {
    accessorKey: "interned_at",
    header: "Registrado el",
    cell: ({ row }) => format(row.original.interned_at, "medium", "es"),
  },

  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "birthdate",
    header: "Fecha de nacimiento",
    cell: ({ row }) => format(row.original.birthdate, "medium", "es"),
  },
  {
    accessorKey: "born_place",
    header: "Lugar de nacimiento",
    cell: ({ row }) =>
      `${row.original.born_place.ciudad}, ${row.original.born_place.departamento}`,
  },
  {
    accessorKey: "user",
    header: "Registrado por",
    cell: ({ row }) => row.original.user.name,
  },
  {
    accessorKey: "status",
    header: "Estatus",
    cell: ({ row }) =>
      row.original.status === "Activo"
        ? "Activo"
        : row.original.status === "Baja"
        ? "Abandono"
        : "Finalizado",
  },
  {
    accessorKey: "acction",
    header: "Acciones",
    cell: ({ row }) => (
      <Link href={`/dashboard/interns/view/${row.original.id}`}>Ver</Link>
    ),
  },
];
