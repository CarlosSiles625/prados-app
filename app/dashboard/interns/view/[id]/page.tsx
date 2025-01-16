import { getInternById } from "@/services/interns";

import { Profile } from "../../_components/interns/profile-picture";
import { UploadImage } from "../../_components/interns/edit/upload-image";
import { format } from "@formkit/tempo";
import {
  Adicction,
  BornPlace,
  Direction,
  Education,
  OutProperties,
  Reference,
} from "@/types/intern";
import { calculateAge } from "@/lib/utils";
import { DischargeIntern } from "../../_components/interns/discharge-intern";
import { DownIntern } from "../../_components/down-intern";
import Link from "next/link";
import { getRecordByInternId } from "@/services/record";
import { RecordsTable } from "../../_components/interns/record/record-table";
import { Historial } from "@/types/record";
import { DeleteIntern } from "../../_components/delete-intern";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { error, intern } = await getInternById(id);
  const { count, error: errorRecord, records } = await getRecordByInternId(id);
  if (error || errorRecord) {
    return <div>Error: {error ?? errorRecord}</div>;
  }
  if (!intern) {
    return <div>Intern not found</div>;
  }
  const bornPlace = intern.born_place as unknown as BornPlace;
  const direction = intern.direction as unknown as Direction;
  const education = intern.education as unknown as Education;
  const talents = intern.talents;
  const references = intern.references as unknown as Reference[];
  const adiccions = intern.adiccions as unknown as Adicction[];
  const user = intern.user;
  const outProperties = intern.out_properties as OutProperties | null;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-center text-xl font-bold">
        Programa de Restauración de Alcoholicos y Drogadictos (PRADOS)
      </h1>
      <div className="flex justify-around">
        <section>
          <h2 className="text-lg font-bold underline">
            Información del Interno
          </h2>
          <p>
            <span className="font-bold">Nombre Completo:</span> {intern.name}
          </p>
          <p>
            <span className="font-bold">Fecha de Nacimiento:</span>{" "}
            {format(intern.birthdate, "full", "es")}{" "}
            {`(${calculateAge(intern.birthdate)} años)`}
          </p>
          <div className="flex gap-2">
            <p>
              <span className="font-bold">Cédula:</span> {intern.cedula}
            </p>
            <p>
              <span className="font-bold">Teléfono:</span> {intern.phone}
            </p>
          </div>

          <p>
            <span className="font-bold">Lugar de Nacimiento:</span>{" "}
            {bornPlace.departamento}, {bornPlace.ciudad}
          </p>
          <p>
            <span className="font-bold">Estado Civil:</span>{" "}
            {intern.marital_status}
          </p>
          <div className="flex gap-2">
            <p>
              <span className="font-bold">Dirección:</span> {direction.street},{" "}
              {direction.zone}, {direction.city}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap max-w-screen-md">
            <p>
              <span className="font-bold">Educación: </span>
              {education.primary && "Primaria"}
              {education.secondary && ", Secundaria"}
              {education.university && ", Universitaria u Otros"}
            </p>
            <p>
              <span className="font-bold">Profesión: </span>
              {intern.profession}
            </p>
            <p>
              <span className="font-bold">Ocupación: </span>
              {intern.ocupation}
            </p>
          </div>
          <p>
            <span className="font-bold">Talentos: </span>
            {talents.join(", ")}
          </p>
          <p>
            <span className="font-bold">Estatus: </span>
            {intern.status}
          </p>
          <p>
            <span className="font-bold">Internado por: </span>
            {user.name}
          </p>
          <div className="flex gap-4 items-center">
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
          <div className="space-x-4">
            <Link
              href={`/dashboard/interns/edit/${id}`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Editar
            </Link>
            <DeleteIntern id={id} />
          </div>
        </section>
        <div>
          <Profile image={intern.image} />
          <UploadImage id={id} />
        </div>
      </div>

      {intern.status === "Activo" && (
        <div className="flex justify-evenly">
          <DischargeIntern id={id} />
          <DownIntern id={id} />
        </div>
      )}

      <section className="">
        <h2 className="text-center font-semibold text-xl underline">
          Prontuario
        </h2>
        <div>
          <RecordsTable
            records={records as unknown as Historial[]}
            count={count ?? 0}
            id={id}
          />
        </div>
      </section>
    </div>
  );
}
