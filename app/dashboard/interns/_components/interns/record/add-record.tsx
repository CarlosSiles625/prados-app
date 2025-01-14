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

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/context/session-context";
import { useState } from "react";
import { addRecord } from "../../../view/[id]/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AddRecord({ id }: { id: string }) {
  const session = useSession();

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { ok, message } = await addRecord(formData);
    if (!ok) {
      toast.error(message);
    }
    toast.success("Registro añadido con éxito");
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Añadir
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir registro</DialogTitle>
          <DialogDescription>
            Añade un nuevo registro para el interno
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 py-4"
          id="add-record"
        >
          <input type="text" hidden value={id} name="internId" readOnly />
          <input
            type="text"
            hidden
            value={session?.user.id}
            name="userId"
            readOnly
          />

          <Label htmlFor="notes">Concepto</Label>
          <Textarea id="notes" name="notes" className="col-span-3" />
        </form>
        <DialogFooter>
          <Button type="submit" form="add-record">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
