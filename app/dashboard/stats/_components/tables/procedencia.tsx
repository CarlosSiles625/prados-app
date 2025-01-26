import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Gender, getLocationStatistics, Year } from "@/services/stats";

export async function Procedencia({
  year,
  gender,
}: {
  year: Year;
  gender: Gender;
}) {
  const stats = await getLocationStatistics(year, gender);
  if (!stats) return <div>Error desconocido</div>;
  return (
    <div className="w-full max-w-screen-md">
      <h2 className="text-lg font-semibold">Procedencia</h2>
      <Table className="border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center border border-gray-300 font-semibold">
              Departamento
            </TableHead>
            <TableHead className="text-center border border-gray-300 font-semibold">
              Ur.
            </TableHead>
            <TableHead className="text-center border border-gray-300 font-semibold">
              Ru.
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.data.map((data) => (
            <TableRow key={data.departamento}>
              <TableHead
                scope="row"
                className="border border-gray-300 text-center   "
              >
                {data.departamento}
              </TableHead>
              <TableCell className="border border-gray-300 text-center  ">
                {data.urbano}
              </TableCell>
              <TableCell className="border border-gray-300 text-center  ">
                {data.rural}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-center font-semibold">
              TOTAL: {stats.total.general}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
