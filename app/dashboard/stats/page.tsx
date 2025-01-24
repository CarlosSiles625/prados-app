import { Procedencia } from "./_components/tables/procedencia";
import { Estudios } from "./_components/tables/estudios";
import { Profesiones } from "./_components/tables/profesiones";
import { Ocupaciones } from "./_components/tables/ocupaciones";
import { Adicciones } from "./_components/tables/adicciones";
import { TiempoConsumo } from "./_components/tables/tiempo-consumo";
import { DistribucionEdad } from "./_components/tables/edades";
import { StatusInternacion } from "./_components/tables/status-internacion";
import { DuracionInternacion } from "./_components/tables/duracion-internacion";

const data = {
  gestion: 2021,
  internCount: 10,
  procedencia: [
    { ur: 1, ru: 2 },
    { ur: 1, ru: 2 },
    { ur: 1, ru: 2 },
    { ur: 1, ru: 2 },
    { ur: 1, ru: 2 },
    { ur: 1, ru: 2 },
    { ur: 1, ru: 2 },
    { ur: 1, ru: 2 },
    { ur: 1, ru: 2 },
  ],
  genero: { hombres: 3, mujeres: 7 },
  estudios: { sinEstudios: 3, primaria: 5, secundaria: 2, universitaria: 6 },
  ocupacion: { sinOcupacion: 3, profesionales: 5, trabajos: 2, jubilados: 6 },
  recuperadosAbandonosPendientes: {
    recuperados: 3,
    abandonos: {
      estudios: 5,
      trabajo: 2,
      familiar: 6,
      salud: 3,
      escapo: 5,
      voluntario: 2,
      otros: 6,
    },
    pendientes: 6,
  },
  edades: {
    "14-19": 3,
    "20-30": 5,
    "31-40": 2,
    "41-50": 6,
    "51-60": 3,
    masDe60: 5,
  },
};

export default function Page() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-2">
      <h1 className="text-center font-semibold text-2xl">
        Reporte de internos
      </h1>
      <div className="flex flex-col gap-y-4">
        <section className="flex justify-center gap-4">
          <p className="text-xl font-semibold">GESTIÓN: {data.gestion}</p>
          <p className="text-xl font-semibold">
            TOTAL INTERNOS: {data.internCount}
          </p>
        </section>
        <section className="w-full flex gap-4">
          <Procedencia />
          <Profesiones />
          <Ocupaciones />
          <Estudios />
        </section>
        <section className="w-full flex justify-around gap-4">
          <Adicciones />
          <TiempoConsumo />
          <DistribucionEdad />
        </section>
        <section className="w-full flex justify-center items-center">
          <StatusInternacion />
        </section>
        <section className="w-full flex justify-center items-center">
          <DuracionInternacion />
        </section>
      </div>
    </div>
  );
}
