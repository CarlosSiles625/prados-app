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
    departament: "La Paz",
    ur: 10,
    ru: 20,
  },
  {
    departament: "Cochabamba",
    ur: 10,
    ru: 20,
  },
  {
    departament: "Santa Cruz",
    ur: 10,
    ru: 20,
  },
  {
    departament: "Chuquisaca",
    ur: 10,
    ru: 20,
  },
  {
    departament: "Oruro",
    ur: 10,
    ru: 20,
  },
  {
    departament: "Potosi",
    ur: 10,
    ru: 20,
  },
  {
    departament: "Tarija",
    ur: 10,
    ru: 20,
  },
  {
    departament: "Beni",
    ur: 10,
    ru: 20,
  },
  {
    departament: "Pando",
    ur: 10,
    ru: 20,
  },
];
export function Procedencia() {
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
          {EXAMPLE_DATA.map((data) => (
            <TableRow key={data.departament}>
              <TableHead
                scope="row"
                className="border border-gray-300 text-center   "
              >
                {data.departament}
              </TableHead>
              <TableCell className="border border-gray-300 text-center  ">
                {data.ur}
              </TableCell>
              <TableCell className="border border-gray-300 text-center  ">
                {data.ru}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-center font-semibold">
              TOTAL: 100
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
