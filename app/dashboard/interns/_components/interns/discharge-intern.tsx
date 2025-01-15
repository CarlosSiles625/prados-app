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
          Dar de Alta
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
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={id} />
            <Button type="submit">Aceptar</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
