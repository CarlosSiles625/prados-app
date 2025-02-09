/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { OutProperties } from "@/types/intern";
import { format } from "@formkit/tempo";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function PrintOut({ intern }: { intern: any }) {
  const contentRef = useRef<HTMLDivElement>(null);
  console.log(intern);
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
  const outProperties = intern.out_properties as OutProperties;

  return (
    <>
      <Button onClick={() => reactToPrintFn()} variant={"outline"}>
        Imprimir Salida
      </Button>
      <div className="space-y-4 print:block hidden" ref={contentRef}>
        <div className="flex flex-col justify-center">
          <h1 className="text-center font-semibold text-xl">
            PARA USO DEL CENTRO
          </h1>
          <p>INTERNADO POR: {intern.user.name}</p>
          <p>¿TERMINÓ EL PROGRAMA?: {intern.finished_program ? "SI" : "NO"}</p>
          <p>
            MOTIVOS DE SALIDA: <span>{outProperties?.reason}</span>
          </p>
          <p>
            FECHA DE SALIDA:{" "}
            <span>{format(intern.out_at, "medium", "es")}</span>
          </p>
          <p>
            OBSERVACIONES: <span>{outProperties?.observations}</span>
          </p>
        </div>
      </div>
    </>
  );
}
