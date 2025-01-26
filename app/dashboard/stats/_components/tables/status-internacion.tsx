import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Gender, getAdmissionStatusStats, Year } from "@/services/stats";

export async function StatusInternacion({
  year,
  gender,
}: {
  year: Year;
  gender: Gender;
}) {
  const stats = await getAdmissionStatusStats(year, gender);
  if (stats.error) return <div>Error desconocido</div>;
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
              {stats.recuperados}
            </TableCell>
            <TableCell className="border border-gray-300">
              {stats.abandonos["Estudios"]}
            </TableCell>
            <TableCell className="border border-gray-300">
              {stats.abandonos["Trabajo"]}
            </TableCell>
            <TableCell className="border border-gray-300">
              {stats.abandonos["Familiar"]}
            </TableCell>
            <TableCell className="border border-gray-300">
              {stats.abandonos["Salud"]}
            </TableCell>
            <TableCell className="border border-gray-300">
              {stats.abandonos["Escapó"]}
            </TableCell>
            <TableCell className="border border-gray-300">
              {stats.abandonos["Voluntad propia"]}
            </TableCell>
            <TableCell className="border border-gray-300">
              {stats.abandonos["Otros"]}
            </TableCell>
            <TableCell className="border border-gray-300">
              {stats.pendientes}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={9} className="text-center font-semibold">
              TOTAL: {stats.total}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
