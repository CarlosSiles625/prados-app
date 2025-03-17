/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { OutProperties } from "@/types/intern";
import { format } from "@formkit/tempo";

export function PrintOut({ intern }: { intern: any }) {
  const outProperties = intern.out_properties as OutProperties;

  return (
    <>
      <div className="flex flex-col justify-center">
        <h1 className="text-center font-semibold">PARA USO DEL CENTRO</h1>
        {/* <p>NOMBRE DEL INTERNO/A: {intern.name}</p> */}
        <p>INTERNADO POR: {intern.user.name}</p>
        <p>¿TERMINÓ EL PROGRAMA?: {intern.finished_program ? "SI" : "NO"}</p>
        <p>
          MOTIVOS DE SALIDA: <span>{outProperties?.reason}</span>
        </p>
        <p>
          FECHA DE SALIDA: <span>{format(intern.out_at, "medium", "es")}</span>
        </p>
        <p>
          OBSERVACIONES: <span>{outProperties?.observations}</span>
        </p>
      </div>
    </>
  );
}
