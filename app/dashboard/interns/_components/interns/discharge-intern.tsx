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
import { useActionState, useEffect, useState } from "react";
import { dischargeIntern } from "../../view/[id]/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DischargeIntern({ id }: { id: string }) {
  const [state, action] = useActionState(dischargeIntern, undefined);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state === "success") {
      toast.success("Interno dado de alta con éxito");
      router.push(`/dashboard/interns/view/${id}`);
      setOpen(false);
    } else {
      toast.error("Ocurrió un error al dar de alta al interno");
    }
  }, [state, router, id]);

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
          <form>
            <input type="hidden" name="id" value={id} />
            <Button formAction={action}>Aceptar</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
