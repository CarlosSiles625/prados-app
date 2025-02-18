/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { calculateAge } from "@/lib/utils";
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
import Image from "next/image";

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
  const image = intern.image as string | null;
  return (
    <>
      <Button onClick={() => reactToPrintFn()}>Imprimir Solicitud</Button>
      <div ref={contentRef} className="print:block hidden">
        <div className="w-full container mx-auto p-2 space-y-2">
          <p className="text-xs text-start text-gray-500 font-semibold">
            PRADOS Impreso el {format(new Date(), "medium", "es")}
          </p>
          <h2 className="text-center font-semibold text-2xl">
            SOLICITUD DE INGRESO
          </h2>
          <h2 className="text-center font-semibold text-xl">
            PROGRAMA DE RESTAURACION DE ALCOHOLICOS Y DROGADICTOS (PRADOS)
          </h2>
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
            <Image
              src={`/interns/${image}`}
              alt="Foto del Interno"
              width={120}
              height={100}
              className="aspect-w-1 aspect-h-1 p-1 border border-gray-500"
            />
          </div>
          <div className="flex gap-1">
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
              <span className="font-bold underline">Carrera:</span>{" "}
              {intern.career}
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
          <div className="gap-x-12 w-full flex flex-wrap">
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
          <h1 className="text-xl font-bold text-center mb-4">
            FILOSOFÍA DE PROGRAMA DE RESTAURACIÓN DE ALCOHÓLICOS Y DROGADICTOS
          </h1>
          <p className="mb-4">
            Es un programa dedicado a la restauración de alcohólicos y
            drogadictos.
          </p>
          <ul className="list-[--list-decoration] list-inside mb-4 ">
            <li>
              Reconocemos que la adicción es un síntoma de otros problemas.
            </li>
            <li>
              Reconocemos que los problemas incluyen el físico, espiritual,
              mental, psicológico y social.
            </li>
            <li>
              Reconocemos que la restauración no solo es cesación de la
              adicción, sino el cambio de los pensamientos que llevan a la
              persona a la adicción.
            </li>
          </ul>
          <p className="mb-4">
            Estamos dedicados a trabajar en todas sus áreas para efectuar una
            restauración verdadera de las adicciones.
          </p>
          <p className="mb-4">
            PRADOS, es una institución Cristiana por lo tanto nos apoyamos en el
            poder de Jesucristo, para traer cambios en la vida del individuo. El
            proceso normalmente dura ocho meses mínimo; Por lo tanto, la persona
            que ingresa a PRADOS debe desear un cambio en su vida, y aceptar que
            por lo menos tiene que permanecer este tiempo.
          </p>
          <p className="mb-4">
            PRADOS, no se responsabilizará de las pertenencias de la persona que
            se escapó o salió sin permiso de la Dirección. Se hace notar que en
            estos casos no se devuelve al interno ningún tipo de dinero, ni
            tampoco sus pertenencias sin autorización del garante. Se dará un
            plazo de <span className="font-semibold">7 días</span> para recoger
            dichas pertenencias, no se entregará a nadie sin que el garante lo
            autorice.
          </p>
          <h3 className="text-center underline text-xl font-semibold">
            SOTENIMIENTO DEL CENTRO
          </h3>
          <p className="mb-4">
            <span className="font-semibold">PRADOS</span>, es una entidad de
            servicio, no lucrativo que no cobra por sus servicios. El Centro
            está sostenido por esfuerzos locales, donativos de las familias,
            amigos, iglesias y esfuerzos de los internados.
          </p>
          <div className="flex gap-4 items-end">
            <div>
              <p>
                Yo: <span className="uppercase">{intern.guarantor_name}</span>
              </p>
              <p>Teléfono: {intern.guarantor_phone}</p>
            </div>
            <div>
              <p>
                con CI: <span>{intern.guarantor_cedula}</span>
              </p>
              <p>Calle o Av.: {intern.guarantor_address}</p>
            </div>
            <p>Ciudad: {direction.city}</p>
          </div>
          <p>
            Soy responsable por <span className="uppercase">{intern.name}</span>{" "}
            con CI. {intern.cedula}, que en caso que quiera salir antes de
            cumplir el tiempo determinado por la institución; no se devolverá la
            garantía correspondiente a Bs. 250,00 (auque su estadía sea solo por
            1 día pierde todo.). Como tambien me comprometo a resarcir
            económicamente cualquier daño que hiciera el o la Sr. (a){" "}
            <span className="uppercase">{intern.name}</span> a los bienes
            inmuebles de la institución.
          </p>
          <p>
            Sucre,{" "}
            <span className="uppercase">
              {format(new Date(), "long", "es")}
            </span>
          </p>
          <div className="mt-4 flex justify-end">
            <div>
              <p>.....................................</p>
              <p>FIRMA DEL GARANTE</p>
            </div>
          </div>
          <h3 className="text-center text-xl font-semibold">
            COMPROMISO DEL INTERNO/A
          </h3>
          <p>
            Yo, <span className="uppercase">{intern.name}</span> con CI.{" "}
            {intern.cedula}. Estoy internándome voluntariamente; porque deseo
            ser liberada de mis adicciones. Estoy de acuerdo con la Filosofía de
            PRADOS; estoy de acuerdo con el sistema de sostenimiento del Centro;
            estoy dispuesta a sujetarme a los reglamentos internos del Centro
            que incluyen, sujeción al horario de levantarme, acostarme,
            estudiar, culto, limpieza de la casa, cocina, trabajos y otros. Esto
            también incluye la separación durante tres meses de mi familia,
            amigos, y otros; asimismo no salir a la calle sola y sin permiso de
            la Dirección. Estoy dispuesta a sujetarme a los reglamentos,
            requisitos que me exija PRADOS. En caso de tener bebé yo soy es la
            única responsable de cuidarla sin descuidar mis áreas de trabajo.
          </p>
          <p>
            Sucre,{" "}
            <span className="uppercase">
              {format(new Date(), "long", "es")}
            </span>
          </p>
          <div className="mt-4 flex justify-end">
            <div>
              <p>........................................</p>
              <p>FIRMA DEL INTERNO/A</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
