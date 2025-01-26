import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Gender, getConsumptionTimeStats, Year } from "@/services/stats";

export async function TiempoConsumo({
  year,
  gender,
}: {
  year: Year;
  gender: Gender;
}) {
  const stats = await getConsumptionTimeStats(year, gender);
  if (stats.error) return <div>Error desconocido</div>;
  return (
    <div className="w-full max-w-screen-md">
      <h2 className="text-lg font-semibold">Tiempo de Consumo</h2>
      <Table className="border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center border border-gray-300 font-semibold">
              Tiempo
            </TableHead>
            <TableHead className="text-center border border-gray-300 font-semibold">
              Cantidad
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.data.map((data) => (
            <TableRow key={data.intervalo}>
              <TableHead
                scope="row"
                className="border border-gray-300 text-center   "
              >
                {data.intervalo}
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
