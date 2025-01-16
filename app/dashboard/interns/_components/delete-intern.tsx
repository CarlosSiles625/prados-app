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
import { deleteInternAction } from "../view/[id]/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeleteIntern({ id }: { id: string }) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const resp = await deleteInternAction(formData);
    if (!resp.ok) {
      toast.error(resp.message);
      return;
    }
    toast.success(resp.message);
    router.push("/dashboard/interns");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Eliminar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar Interno</DialogTitle>
          <DialogDescription>
            Está seguro que desea eliminar este interno? Esta acción no se puede
            deshacer.
          </DialogDescription>
        </DialogHeader>
        <form id="deleteIntern" onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={id} />
        </form>
        <DialogFooter>
          <Button type="submit" form="deleteIntern">
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
