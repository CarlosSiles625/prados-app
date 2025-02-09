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
import { reinsertInternAction } from "../view/[id]/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ReinsertIntern({ id }: { id: string }) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const { ok, message } = await reinsertInternAction(formData);
    if (!ok) {
      toast.error(message);
      return;
    }
    toast.success(message);
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Re Insertar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Re Insertar Interno</DialogTitle>
          <DialogDescription>
            ¿Está seguro que desea re insertar este interno?
          </DialogDescription>
        </DialogHeader>
        <form id="reinsertIntern" onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={id} />
        </form>
        <DialogFooter>
          <Button type="submit" form="reinsertIntern">
            Reinsertar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
