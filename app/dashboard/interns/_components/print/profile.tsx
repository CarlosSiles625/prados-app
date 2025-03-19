/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { calculateAge, getText } from "@/lib/utils";
import {
  Adicction,
  BornPlace,
  Direction,
  Education,
  Reference,
} from "@/types/intern";
import { format } from "@formkit/tempo";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { SITE_URL } from "@/constants/site";
import { Text } from "@/types/text";
import { RenderHtml } from "@/components/render-html";
import { PrintOut } from "./out";

export function PrintProfile({
  intern,
  texts,
}: {
  intern: any;
  texts: Text[];
}) {
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
            * {
            font-family: "Times New Roman",serif;
            font-size: 12pt;
            }
        }
    `,
  });
  console.log(intern);
  const bornPlace = intern.born_place as unknown as BornPlace;
  const direction = intern.direction as unknown as Direction;
  const education = intern.education as unknown as Education;
  const talents = intern.talents;
  const references = intern.references as unknown as Reference[];
  const adiccions = intern.adiccions as unknown as Adicction[];
  const gender = intern.gender as "M" | "F";
  // const user = intern.user;
  const image = intern.image as string | null;
  const filosofia = getText(texts, "FILOSOFIA");
  const sostentimiento = getText(
    texts,
    gender === "M" ? "SOSTENIMIENTO_M" : "SOSTENIMIENTO_F"
  )
    .replace("%NOMBRE_INTERNO%", intern.name)
    .replace("%CI_INTERNO%", intern.cedula)
    .replace("%FECHA%", format(new Date(), "long", "es"))
    .replace("%NOMBRE_GARANTE%", intern.guarantor_name)
    .replace("%CI_GARANTE%", intern.guarantor_cedula)
    .replace("%TEL_GARANTE%", intern.guarantor_phone)
    .replace("%DIR_GARANTE%", intern.guarantor_address)
    .replace("%CIUDAD_GARANTE%", intern.direction.city);
  const compromiso = getText(
    texts,
    gender === "M" ? "COMPROMISO_M" : "COMPROMISO_F"
  )
    .replace("%NOMBRE_INTERNO%", intern.name)
    .replace("%CI_INTERNO%", intern.cedula)
    .replace("%FECHA%", format(new Date(), "long", "es"))
    .replace("%NOMBRE_GARANTE%", intern.guarantor_name)
    .replace("%CI_GARANTE%", intern.guarantor_cedula)
    .replace("%TEL_GARANTE%", intern.guarantor_phone)
    .replace("%DIR_GARANTE%", intern.guarantor_address)
    .replace("%CIUDAD_GARANTE%", intern.direction.city);
  const compromiso_int = getText(
    texts,
    gender === "M" ? "COMPROMISO_INTERNACION_M" : "COMPROMISO_INTERNACION_F"
  )
    .replace("%NOMBRE_INTERNO%", intern.name)
    .replace("%CI_INTERNO%", intern.cedula)
    .replace("%FECHA%", format(new Date(), "long", "es"))
    .replace("%NOMBRE_GARANTE%", intern.guarantor_name)
    .replace("%CI_GARANTE%", intern.guarantor_cedula)
    .replace("%TEL_GARANTE%", intern.guarantor_phone)
    .replace("%DIR_GARANTE%", intern.guarantor_address)
    .replace("%CIUDAD_GARANTE%", intern.direction.city);
  const status = intern.status as "Activo" | "Alta" | "Baja";
  return (
    <>
      <Button onClick={() => reactToPrintFn()}>Imprimir Solicitud</Button>
      <div ref={contentRef} className="print:block hidden">
        <div className="w-full container mx-auto p-2 space-y-2">
          <h2 className="text-center font-semibold text-2xl">
            SOLICITUD DE INGRESO
          </h2>
          <h2 className="text-center font-semibold text-xl">
            PROGRAMA DE RESTAURACION DE ALCOHOLICOS Y DROGADICTOS (PRADOS)
          </h2>
          <div className="w-full flex justify-between items-center">
            <section className="space-y-2">
              <p className="">
                <span className="underline font-bold">NOMBRE COMPLETO:</span>{" "}
                {intern.name}
              </p>
              <p className="">
                <span className="font-bold underline">
                  FECHA DE NACIMIENTO:
                </span>{" "}
                {format(intern.birthdate, "long", "es")}{" "}
                {`(${calculateAge(intern.birthdate)} años)`}
              </p>
              <p className="">
                <span className="font-bold underline">
                  LUGAR DE NACIMIENTO:
                </span>{" "}
                {bornPlace.departamento}, {bornPlace.ciudad}
              </p>
              <div className="flex gap-2 justify-between">
                <p className="">
                  <span className="font-bold underline">
                    CARNET DE IDENTIDAD:
                  </span>{" "}
                  {intern.cedula}
                </p>
                <p className="">
                  <span className="font-bold underline">TEL:</span>{" "}
                  {intern.phone}
                </p>
              </div>

              <p className="">
                <span className="font-bold underline">ESTADO CIVIL:</span>{" "}
                {intern.marital_status}
              </p>
            </section>
            <img
              src={`${SITE_URL}/api/image?filename=${image}`}
              alt="Foto del Interno"
              width={120}
              height={100}
              className="aspect-w-1 aspect-h-1 p-1 border border-gray-500"
            />
          </div>
          <div className="flex gap-x-4 flex-wrap">
            <p className="">
              <span className="font-bold">CALLE O AV.:</span> {direction.street}
            </p>
            <p className="">
              <span className="font-bold">ZONA O BARRIO:</span> {direction.zone}
            </p>
            <p className="">
              <span className="font-bold">CIUDAD:</span> {direction.city}
            </p>
          </div>
          <div className="w-full flex gap-4 flex-wrap ">
            <p className="">
              <span className="font-bold underline">EDUCACIÓN PRIMARIA:</span>{" "}
              {education.primary && "Si"}
            </p>
            <p className="">
              <span className="font-bold underline">BACHILLER:</span>{" "}
              {education.secondary && "Si"}
            </p>
            <p className="">
              <span className="font-bold underline">UNIVERSIDAD U OTROS:</span>{" "}
              {education.university && "Si"}
            </p>
            <p className="">
              <span className="font-bold underline">CARRERA:</span>{" "}
              {intern.career}
            </p>
            <p className="">
              <span className="font-bold underline">PROFESIÓN:</span>{" "}
              {intern.profession}
            </p>
            <p className="">
              <span className="font-bold underline">OCUPACIÓN:</span>{" "}
              {intern.ocupation}
            </p>
            <p>
              <span className="font-bold underline">TALENTOS:</span>{" "}
              {talents.join(", ")}
            </p>
            {/* <p className="">
              <span className="font-bold underline">Estatus:</span>{" "}
              {intern.status}
            </p> */}
            {/* <p className="">
              <span className="font-bold underline">Internado por:</span>{" "}
              {user.name}
            </p> */}
            <p className="">
              <span className="font-bold underline">FECHA DE INTERNACIÓN:</span>{" "}
              {format(intern.interned_at, "medium", "es")}
            </p>
          </div>
          <div className="gap-x-12 w-full flex flex-wrap">
            <div className="mt-1 mb-1">
              <p className="font-semibold underline ">REFERENCIAS</p>
              <ul>
                {references.map((ref, index) => (
                  <li key={index} className="text-md">
                    <span className="font-bold ">{ref.name}</span>-{ref.phone}{" "}
                    {ref.relationship}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold underline ">ADICCIONES</p>
              <ul>
                {adiccions.map((adiccion, index) => (
                  <li key={index} className="text-md">
                    <span className="font-bold ">{adiccion.name}</span>,{" "}
                    {adiccion.consumption_time}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <RenderHtml htmlString={filosofia ?? ""} />
          </div>
          <div style={{ pageBreakBefore: "always" }}>
            <RenderHtml htmlString={sostentimiento} />
            <div className="w-full flex justify-end">
              <div>
                <p>........................................</p>
                <p>FIRMA DEL GARANTE</p>
              </div>
            </div>
          </div>
          <div>
            <RenderHtml htmlString={compromiso} />
            <div className="w-full flex justify-end">
              <div>
                <p>........................................</p>
                <p>FIRMA DEL {gender === "M" ? "INTERNO" : "INTERNA"}</p>
              </div>
            </div>
          </div>
          {status !== "Activo" && (
            <div>
              <PrintOut intern={intern} />
            </div>
          )}
          <div style={{ pageBreakBefore: "always" }}>
            <RenderHtml htmlString={compromiso_int} />
            <br />
            <div className="w-full flex justify-center gap-10">
              <div>
                <p>.........................</p>
                <p className="italic">
                  {gender === "M" ? "Interno" : "Interna"}
                </p>
              </div>
              <div>
                <p>.........................</p>
                <p className="italic">Garante</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
