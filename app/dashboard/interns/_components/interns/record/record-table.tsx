"use client";

import { DataTable } from "@/components/data-table";
import { Historial } from "@/types/record";
import { columns } from "./columns";
import { AddRecord } from "./add-record";

type Props = {
  records: Historial[];
  count: number;
  id: string;
};

export function RecordsTable({ records, id }: Props) {
  return (
    <div className="max-w-screen-lg mx-auto space-y-1">
      <AddRecord id={id} />
      <DataTable columns={columns} data={records} />
    </div>
  );
}
