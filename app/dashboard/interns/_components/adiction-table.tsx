import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Adicction } from "@/types/intern";
import { Dispatch, SetStateAction } from "react";
import { AddAdiction } from "./adiction-modal";

type Props = {
  adicctions: Adicction[];
  setAdictions: Dispatch<SetStateAction<Adicction[]>>;
};

export function AdicctionTable({ adicctions, setAdictions }: Props) {
  const handleRemove = (name: string) => {
    setAdictions((prev) => prev.filter((adicction) => adicction.name !== name));
  };
  return (
    <Table className="w-[600px] border border-gray-200">
      <TableCaption>Adicciones</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Adicción</TableHead>
          <TableHead>Tiempo de consumo</TableHead>
          <TableHead>Eliminar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {adicctions?.map((adicction) => (
          <TableRow key={adicction.name}>
            <TableCell>{adicction.name}</TableCell>
            <TableCell>{adicction.consumption_time}</TableCell>
            <TableCell>
              <button
                onClick={() => handleRemove(adicction.name)}
                className="text-red-500"
              >
                Eliminar
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <AddAdiction setAdicctions={setAdictions} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
