import { Procedencia } from "./_components/tables/procedencia";
import { Estudios } from "./_components/tables/estudios";
import { Profesiones } from "./_components/tables/profesiones";
import { Ocupaciones } from "./_components/tables/ocupaciones";
import { Adicciones } from "./_components/tables/adicciones";
import { TiempoConsumo } from "./_components/tables/tiempo-consumo";
import { DistribucionEdad } from "./_components/tables/edades";
import { StatusInternacion } from "./_components/tables/status-internacion";
import { DuracionInternacion } from "./_components/tables/duracion-internacion";
import { YearSelect } from "./_components/year-select";
import { SelectGender } from "./_components/select-gender";
import { Gender, Year } from "@/services/stats";
import { PrintReport } from "./_components/print-report";
import { Career } from "./_components/tables/career";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ year: Year; gender: Gender }>;
}) {
  const queryParams = await searchParams;

  return (
    <div className="container mx-auto p-4 flex flex-col gap-2">
      <h1 className="text-center font-semibold text-2xl">
        Reporte de internos
      </h1>
      <div className="flex flex-col gap-y-4">
        <section className="flex justify-center gap-4">
          <YearSelect />
          <SelectGender />
        </section>
        <div className="w-full flex justify-center items-center">
          <PrintReport>
            <p className="text-center font-semibold text-xl">PRADOS</p>
            <p className="text-center font-semibold text-xl">
              Centro de Rehabilitación de Alcoholicos y Drogadictos.
            </p>
            <div className="flex gap-4 justify-center items-center">
              <p className="text-center font-semibold text-md">
                Reporte de la Gestión{" "}
                {queryParams.year ? queryParams.year : "Hitórico"}
              </p>
              <p className="text-center font-semibold text-md">
                Género: {queryParams.gender ? queryParams.gender : "Ambos"}
              </p>
            </div>
            <div className="space-y-3">
              <Profesiones
                gender={queryParams.gender}
                year={queryParams.year}
              />
              <Ocupaciones
                gender={queryParams.gender}
                year={queryParams.year}
              />
              <Estudios gender={queryParams.gender} year={queryParams.year} />
              <Procedencia
                gender={queryParams.gender}
                year={queryParams.year}
              />
              <Adicciones gender={queryParams.gender} year={queryParams.year} />
              <TiempoConsumo
                gender={queryParams.gender}
                year={queryParams.year}
              />
              <DistribucionEdad
                gender={queryParams.gender}
                year={queryParams.year}
              />
              <Career gender={queryParams.gender} year={queryParams.year} />
              <StatusInternacion
                gender={queryParams.gender}
                year={queryParams.year}
              />
              <DuracionInternacion
                gender={queryParams.gender}
                year={queryParams.year}
              />
            </div>
          </PrintReport>
        </div>
        <section className="w-full flex gap-4">
          <Procedencia gender={queryParams.gender} year={queryParams.year} />
          <Profesiones gender={queryParams.gender} year={queryParams.year} />
          <Ocupaciones gender={queryParams.gender} year={queryParams.year} />
          <Estudios gender={queryParams.gender} year={queryParams.year} />
        </section>
        <section className="w-full flex justify-around gap-4">
          <Adicciones gender={queryParams.gender} year={queryParams.year} />
          <TiempoConsumo gender={queryParams.gender} year={queryParams.year} />
          <DistribucionEdad
            gender={queryParams.gender}
            year={queryParams.year}
          />
          <Career gender={queryParams.gender} year={queryParams.year} />
        </section>
        <section className="w-full flex justify-center items-center">
          <StatusInternacion
            gender={queryParams.gender}
            year={queryParams.year}
          />
        </section>
        <section className="w-full flex justify-center items-center">
          <DuracionInternacion
            gender={queryParams.gender}
            year={queryParams.year}
          />
        </section>
      </div>
    </div>
  );
}
