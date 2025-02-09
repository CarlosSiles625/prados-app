import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import { Gender, getInternsByCareerStats, Year } from "@/services/stats";

export async function Career({ year, gender }: { year: Year; gender: Gender }) {
  const stats = await getInternsByCareerStats(year, gender);
  if (stats.error) return <div>Error desconocido</div>;
  return (
    <div className="w-full max-w-screen-md">
      <h2 className="text-lg font-semibold">Distribución por carrera</h2>
      <Table className="border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center border border-gray-300 font-semibold">
              Carrera
            </TableHead>
            <TableHead className="text-center border border-gray-300 font-semibold">
              Cantidad
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.data.map((data) => (
            <TableRow key={data.carrera}>
              <TableHead
                scope="row"
                className="border border-gray-300 text-center   "
              >
                {data.carrera}
              </TableHead>
              <TableCell className="border border-gray-300 text-center  ">
                {data.cantidad}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-center font-semibold">
              TOTAL: {stats.total}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
