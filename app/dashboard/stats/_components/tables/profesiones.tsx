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
  { name: "Abogado/a", total: 10 },
  { name: "Médico", total: 20 },
  { name: "Odontólogo/a", total: 30 },
  { name: "Economista", total: 40 },
  { name: "Ingeniero/a", total: 50 },
  { name: "Arquitecto/a", total: 60 },
  { name: "Contador/a", total: 70 },
  { name: "Docente", total: 80 },
  { name: "Secretaria/o", total: 90 },
  { name: "Profesional Técnico/a", total: 100 },
  { name: "Policia", total: 110 },
  { name: "Sin profesión", total: 120 },
  { name: "Otros", total: 130 },
];
export function Profesiones() {
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
            <TableCell colSpan={3} className="text-center font-semibold">
              TOTAL: 100
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
