import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
export function StatusInternacion() {
  return (
    <div className="w-full max-w-screen-lg">
      <h2 className="text-lg font-semibold">Estatus de internación</h2>
      <Table className="border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead
              rowSpan={2}
              scope="col"
              className="text-center border border-gray-300 font-semibold"
            >
              Recuperados
            </TableHead>
            <TableHead
              colSpan={7}
              className="text-center border border-gray-300 font-semibold"
            >
              Abandonos
            </TableHead>
            <TableHead
              rowSpan={2}
              className="text-center border border-gray-300 font-semibold"
              scope="col"
            >
              Pendientes
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead
              scope="col"
              className="text-center border border-gray-300 font-semibold"
            >
              Estudios
            </TableHead>
            <TableHead
              scope="col"
              className="text-center border border-gray-300 font-semibold"
            >
              Trabajo
            </TableHead>
            <TableHead
              scope="col"
              className="text-center border border-gray-300 font-semibold"
            >
              Familiar
            </TableHead>
            <TableHead
              scope="col"
              className="text-center border border-gray-300 font-semibold"
            >
              Salud
            </TableHead>
            <TableHead
              scope="col"
              className="text-center border border-gray-300 font-semibold"
            >
              Escapó
            </TableHead>
            <TableHead
              scope="col"
              className="text-center border border-gray-300 font-semibold"
            >
              Voluntario
            </TableHead>
            <TableHead
              scope="col"
              className="text-center border border-gray-300 font-semibold"
            >
              Otros
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-center">
            <TableCell className="border border-gray-300">
              {data.recuperadosAbandonosPendientes.recuperados}
            </TableCell>
            <TableCell className="border border-gray-300">
              {data.recuperadosAbandonosPendientes.abandonos.estudios}
            </TableCell>
            <TableCell className="border border-gray-300">
              {data.recuperadosAbandonosPendientes.abandonos.trabajo}
            </TableCell>
            <TableCell className="border border-gray-300">
              {data.recuperadosAbandonosPendientes.abandonos.familiar}
            </TableCell>
            <TableCell className="border border-gray-300">
              {data.recuperadosAbandonosPendientes.abandonos.salud}
            </TableCell>
            <TableCell className="border border-gray-300">
              {data.recuperadosAbandonosPendientes.abandonos.escapo}
            </TableCell>
            <TableCell className="border border-gray-300">
              {data.recuperadosAbandonosPendientes.abandonos.voluntario}
            </TableCell>
            <TableCell className="border border-gray-300">
              {data.recuperadosAbandonosPendientes.abandonos.otros}
            </TableCell>
            <TableCell className="border border-gray-300">
              {data.recuperadosAbandonosPendientes.pendientes}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={9} className="text-center font-semibold">
              TOTAL: {data.internCount}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
