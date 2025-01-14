import { ColumnDef } from "@tanstack/react-table";
import { format } from "@formkit/tempo";

import { Historial } from "@/types/record";

export const columns: ColumnDef<Historial>[] = [
  {
    accessorKey: "created_at",
    header: "Fecha",
    cell: ({ row }) => format(row.original.created_at, "medium", "es"),
  },

  {
    accessorKey: "notes",
    header: "Histórico",
    cell: ({ row }) => <p className="max-w-[500px]">{row.original.notes}</p>,
  },
  {
    accessorKey: "user",
    header: "Responsable",
    cell: ({ row }) => row.original.user.name,
  },
];
