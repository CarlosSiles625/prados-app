import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EXAMPLE_DATA = [
  {
    name: "0-1 año",
    total: 10,
  },
  {
    name: "2-3 años",
    total: 20,
  },
  {
    name: "4-7 años",
    total: 30,
  },
  {
    name: "7+ años",
    total: 40,
  },
];

export function TiempoConsumo() {
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
          {EXAMPLE_DATA.map((data) => (
            <TableRow key={data.name}>
              <TableHead
                scope="row"
                className="border border-gray-300 text-center   "
              >
                {data.name}
              </TableHead>
              <TableCell className="border border-gray-300 text-center  ">
                {data.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-center font-semibold">
              TOTAL: 100
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
