"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { downIntern } from "../view/[id]/actions";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ABANDONMENT_REASONS } from "@/constants/intern";
import { Input } from "@/components/ui/input";

export function DownIntern({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const { ok, message } = await downIntern(formdata);
    if (!ok) {
      toast.error(message);
      return;
    }
    toast.success(message);
    router.refresh();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" type="button">
          Dar de Baja
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dar de Baja</DialogTitle>
          <DialogDescription>
            ¿Esta seguro de dar de baja la interno?
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={id} />
          <Label>
            Motivos de la salida
            <Select name="reason" required>
              <SelectTrigger className="w-[380px]">
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Motivos de salida</SelectLabel>
                  {ABANDONMENT_REASONS.map((reason) => (
                    <SelectItem key={reason.id} value={reason.name}>
                      {reason.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Label>
          <Label>
            Observaciones
            <Textarea name="observations" required />
          </Label>
          <Label htmlFor="out_at">
            Fecha:
            <Input type="date" id="out_at" name="out_at" />
          </Label>

          <Button>Aceptar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
