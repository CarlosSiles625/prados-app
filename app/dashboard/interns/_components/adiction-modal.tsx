"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ADICCTIONS } from "@/constants/intern";
import { Adicction } from "@/types/intern";
import { Dispatch, SetStateAction, useState } from "react";

export function AddAdiction({
  setAdicctions,
}: {
  setAdicctions: Dispatch<SetStateAction<Adicction[]>>;
}) {
  const [adiction, setAdiction] = useState<Adicction>({} as Adicction);

  const handleAdd = () => {
    if (adiction.name && adiction.consumption_time) {
      setAdicctions((prev) => {
        if (prev.find((a) => a.name === adiction.name)) {
          return prev.map((a) => {
            if (a.name === adiction.name) {
              return adiction;
            }
            return a;
          });
        }
        return [...prev, adiction];
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          Añadir
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Adicción</DialogTitle>
          <DialogDescription>
            Seleccione cuidadosamente, el formato para el tiempo de consumo es:
            2 Años, 2 Meses, 3 Semanas, 2 Días, etc.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Select
              onValueChange={(value) =>
                setAdiction({ name: value, consumption_time: "" })
              }
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Adicciones</SelectLabel>
                  {ADICCTIONS.map((adiction) => (
                    <SelectItem
                      key={adiction.id}
                      value={adiction.name}
                      id="name"
                    >
                      {adiction.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Tiempo de consumo
            </Label>
            <Input
              id="time"
              className="col-span-3"
              name="time"
              onChange={(e) =>
                setAdiction({
                  ...adiction!,
                  consumption_time: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleAdd}>
              Registrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
