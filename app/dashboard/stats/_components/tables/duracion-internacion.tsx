/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Gender, getInternmentDurationStats, Year } from "@/services/stats";

export async function DuracionInternacion({
  gender,
  year,
}: {
  year: Year;
  gender: Gender;
}) {
  const stats = await getInternmentDurationStats(year, gender);
  if (stats.error) return <div>Error desconocido</div>;
  const activeData = stats.data.filter((data) => data.status === "Activo");
  const downData = stats.data.filter((data) => data.status === "Baja");
  const upData = stats.data.filter((data) => data.status === "Alta");
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-center">
        Duración de internación
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <DataTable data={activeData} tittle="Internos activos" />
        <DataTable data={downData} tittle="Internos dados de baja" />
        <DataTable data={upData} tittle="Internos dados de alta" />
      </div>
    </div>
  );
}

const DataTable = ({ data, tittle }: { data: any[]; tittle: string }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">{tittle}</h2>
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
          {data.map((data) => (
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
              TOTAL: {data.reduce((acc, curr) => acc + curr.cantidad, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
