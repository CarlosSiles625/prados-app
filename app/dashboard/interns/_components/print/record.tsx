/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/data-table";
import { calculateAge } from "@/lib/utils";
import { format } from "@formkit/tempo";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { columns } from "../interns/record/columns";
import { Button } from "@/components/ui/button";

export function PrintRecord({
  intern,
  records,
}: {
  intern: any;
  records: any;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const image = intern.image;
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: `
           @page {
               size: letter portrait;
               margin: 1cm;
           }
           @media print {
               body {
               margin: 0;
               }
           }
       `,
  });
  return (
    <>
      <Button onClick={() => reactToPrintFn()} variant={"secondary"}>
        Imprimir prontuario
      </Button>
      <div className="space-y-4 print:block hidden" ref={contentRef}>
        <div className="flex justify-center gap-x-4">
          <div>
            <h1 className="text-center font-bold text-xl">PRADOS</h1>
            <p className="text-center font-semibold text-sm">
              Programa de Rehabilitación de Alcoholicos y Drogadictos
            </p>
          </div>
          <img
            src={`/${image}`}
            alt="Inter Profile Image"
            width={80}
            height={80}
            className="aspect-w-1 aspect-h-1 p-1 border border-gray-500"
          />
        </div>

        <h2 className="text-center font-semibold">PRONTUARIO</h2>
        <div className="flex justify-between">
          <p className="text-sm">
            <span className="underline font-bold">Nombre:</span> {intern.name}
          </p>
          <div className="flex gap-4 items-center">
            <p className="text-sm">
              <span className="underline font-bold">Edad:</span>{" "}
              {`(${calculateAge(intern.birthdate)} años)`}
            </p>
            <p className="text-sm">
              <span className="font-bold">Fecha de Internación </span>
              {format(intern.interned_at, "medium", "es")}
            </p>
          </div>
        </div>
        <DataTable columns={columns} data={records} />
      </div>
    </>
  );
}
