/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { calculateAge } from "@/lib/utils";
import {
  Adicction,
  BornPlace,
  Direction,
  Education,
  OutProperties,
  Reference,
} from "@/types/intern";
import { format } from "@formkit/tempo";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function PrintProfile({ intern }: { intern: any }) {
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
  const bornPlace = intern.born_place as unknown as BornPlace;
  const direction = intern.direction as unknown as Direction;
  const education = intern.education as unknown as Education;
  const talents = intern.talents;
  const references = intern.references as unknown as Reference[];
  const adiccions = intern.adiccions as unknown as Adicction[];
  const user = intern.user;
  const outProperties = intern.out_properties as OutProperties | null;
  const image = intern.image as string | null;
  return (
    <>
      <Button onClick={() => reactToPrintFn()}>Imprimir Perfil</Button>
      <div ref={contentRef} className="print:block hidden">
        <div className="w-full container mx-auto p-2 space-y-4">
          <p className="text-xs text-start text-gray-500 font-semibold">
            PRADOS Impreso el {format(new Date(), "medium", "es")}
          </p>
          <h1 className="text-center font-semibold text-xl">
            PROGRAMA DE RESTAURACION DE ALCOHOLICOS Y DROGADICTOS (PRADOS)
          </h1>
          <div className="w-full flex justify-between items-center">
            <section>
              <p className="text-lg">
                <span className="underline font-bold">Nombre Completo:</span>{" "}
                {intern.name}
              </p>
              <p className="text-lg">
                <span className="font-bold underline">
                  Fecha de Nacimiento:
                </span>{" "}
                {format(intern.birthdate, "long", "es")}{" "}
                {`(${calculateAge(intern.birthdate)} años)`}
              </p>
              <div className="flex gap-2">
                <p className="text-lg">
                  <span className="font-bold underline">Cédula:</span>{" "}
                  {intern.cedula}
                </p>
                <p className="text-lg">
                  <span className="font-bold underline">Teléfono:</span>{" "}
                  {intern.phone}
                </p>
              </div>
              <p className="text-lg">
                <span className="font-bold underline">
                  Lugar de Nacimiento:
                </span>{" "}
                {bornPlace.departamento}, {bornPlace.ciudad}
              </p>
              <p className="text-lg">
                <span className="font-bold underline">Estado Civil:</span>{" "}
                {intern.marital_status}
              </p>
            </section>
            <img
              src={`/interns/${image}`}
              alt="Foto del Interno"
              width={120}
              height={100}
              className="aspect-w-1 aspect-h-1 p-1 border border-gray-500"
            />
          </div>
          <div className="flex gap-2">
            <p>
              <span className="font-bold">Dirección:</span> {direction.street},{" "}
              {direction.zone}, {direction.city}
            </p>
          </div>
          <div className="w-full flex gap-4 flex-wrap ">
            <p>
              <span className="font-bold underline">Educación:</span>{" "}
              {education.primary && "Primaria"}
              {education.secondary && ", Secundaria"}
              {education.university && ", Universitaria u Otros"}
            </p>
            <p>
              <span className="font-bold underline">Profesión:</span>{" "}
              {intern.profession}
            </p>
            <p>
              <span className="font-bold underline">Ocupación:</span>{" "}
              {intern.ocupation}
            </p>
            <p>
              <span className="font-bold underline">Talentos:</span>{" "}
              {talents.join(", ")}
            </p>
            <p>
              <span className="font-bold underline">Estatus:</span>{" "}
              {intern.status}
            </p>
            <p>
              <span className="font-bold underline">Internado por:</span>{" "}
              {user.name}
            </p>
            <p>
              <span className="font-bold underline">Fecha de Internación:</span>{" "}
              {format(intern.interned_at, "medium", "es")}
            </p>
          </div>
          <div className="gap-x-12 w-full flex flex-wrap justify-center">
            <div className="mt-1 mb-1">
              <p className="font-semibold underline">Referencias</p>
              <ul>
                {references.map((ref, index) => (
                  <li key={index} className="text-md">
                    <span className="font-bold">{ref.name}</span> {ref.phone}{" "}
                    {ref.relationship}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold underline">Adicciones</p>
              <ul>
                {adiccions.map((adiccion, index) => (
                  <li key={index} className="text-md">
                    <span className="font-bold">{adiccion.name}</span>,{" "}
                    {adiccion.consumption_time}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {intern.status !== "Activo" && (
            <div>
              <h2 className="font-semibold underline">
                Caracteristicas de la Salida
              </h2>
              <p>
                <span className="font-semibold">¿Terminó el programa?:</span>{" "}
                {intern.finished_program ? "Si" : "No"}
              </p>
              <p>
                <span className="font-semibold">Motivos de la salida:</span>{" "}
                {outProperties?.reason}
              </p>
              <p>
                <span className="font-semibold">Fecha de salida:</span>{" "}
                {format(intern.out_at ?? "", "full", "es")}
              </p>
              <p>
                <span className="font-semibold">Observaciones:</span>{" "}
                {outProperties?.observations}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
