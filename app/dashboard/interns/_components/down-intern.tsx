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
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { downIntern } from "../view/[id]/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function DownIntern({ id }: { id: string }) {
  const [state, action] = useActionState(downIntern, undefined);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state === "success") {
      toast.success("Interno dado de baja");
      router.push(`/dashboard/interns/view/${id}`);
      setOpen(false);
    } else {
      toast.error("Ocurrió un error al dar de Baja al interno");
    }
  }, [state, router, id]);

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
        <form className="space-y-4">
          <input type="hidden" name="id" value={id} />
          <Label>
            Motivos de la salida
            <Input name="reason" required />
          </Label>
          <Label>
            Observaciones
            <Textarea name="observations" required />
          </Label>
          <Button formAction={action}>Aceptar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
