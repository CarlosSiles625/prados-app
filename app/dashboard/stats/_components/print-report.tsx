"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function PrintReport({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);

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
      <Button onClick={() => reactToPrintFn()}>Imprimir Reporte</Button>
      <div ref={contentRef} className="print:block hidden">
        {children}
      </div>
    </>
  );
}
