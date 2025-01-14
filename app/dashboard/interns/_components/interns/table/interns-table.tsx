/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { InternsType } from "@/types/intern";
import { SearchIntern } from "./search";
import { Pagination } from "./pagination";

export interface InterQueryParams {
  page: number;
  limit: number;
  q: string;
  searchBy: "name" | "cedula";
}

type Props = {
  interns: InternsType[];
  count: number;
};

export function InternsTable({ interns, count }: Props) {
  return (
    <div className="flex flex-col gap-2 container mx-auto p-2">
      <SearchIntern />
      <DataTable columns={columns} data={interns as any} />
      <Pagination count={count} />
    </div>
  );
}
