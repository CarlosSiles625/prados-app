import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Gender, getProfessionsStats, Year } from "@/services/stats";

export async function Profesiones({
  year,
  gender,
}: {
  year: Year;
  gender: Gender;
}) {
  const stats = await getProfessionsStats(year, gender);
  if (!stats) return <div>Error desconocido</div>;
  return (
    <div className="w-full max-w-screen-md">
      <h2 className="text-lg font-semibold">Profesiones</h2>
      <Table className="border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center border border-gray-300 font-semibold">
              Profesión
            </TableHead>
            <TableHead className="text-center border border-gray-300 font-semibold">
              Cantidad
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.data.map((data) => (
            <TableRow key={data.id}>
              <TableHead
                scope="row"
                className="border border-gray-300 text-center   "
              >
                {data.name}
              </TableHead>
              <TableCell className="border border-gray-300 text-center  ">
                {data.count}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-center font-semibold">
              TOTAL: {stats.total}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
