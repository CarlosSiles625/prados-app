"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { dischargeIntern } from "../../view/[id]/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function DischargeIntern({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const { ok, message } = await dischargeIntern(formdata);
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
        <Button
          variant="default"
          className="bg-green-700 hover:bg-green-800"
          type="button"
        >
          Terminar
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dar de Alta</DialogTitle>
          <DialogDescription>
            ¿Esta seguro de dar de alta la interno?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form onSubmit={handleSubmit} className="space-y-2 w-full">
            <input type="hidden" name="id" value={id} />
            <Label htmlFor="out_at">Fecha:</Label>
            <Input type="date" id="out_at" name="out_at" className="max-w-xs" />
            <Label>
              Observaciones
              <Textarea name="observations" />
            </Label>

            <Button type="submit">Aceptar</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
