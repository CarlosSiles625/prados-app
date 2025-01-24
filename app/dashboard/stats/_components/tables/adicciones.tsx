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
    name: "Alcohol",
    total: 10,
  },
  {
    name: "Drogas",
    total: 20,
  },
  {
    name: "Tabaco",
    total: 30,
  },
  {
    name: "Juego",
    total: 40,
  },
  {
    name: "Otras",
    total: 100,
  },
];

export function Adicciones() {
  return (
    <div className="w-full max-w-screen-md">
      <h2 className="text-lg font-semibold">Adicciones</h2>
      <Table className="border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center border border-gray-300 font-semibold">
              Nivel
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
