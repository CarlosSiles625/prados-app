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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/context/session-context";
import { generateExampleExcel } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ImportModal() {
  const [open, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const handledownloadFormat = () => {
    generateExampleExcel();
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("userId", session?.user.id ?? "");
    const resp = await fetch("/api/import", {
      method: "POST",
      headers: {
        contentType: "application/json",
      },
      body: formData,
    });
    const data = await resp.json();
    if (!data.ok) {
      setIsLoading(false);
      toast.error("Error al importar los internos");
      return;
    }
    setIsLoading(false);
    setIsOpen(false);
    router.refresh();
    toast.success("Internos importados correctamente");
  };
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Importar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Importar datos</DialogTitle>
          <DialogDescription>
            Esta herramienta permite importar datos de los internos desde un
            excel, asegúrate de tener el archivo listo y en el formato correcto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} id="import-form">
          <Button
            variant="secondary"
            onClick={handledownloadFormat}
            type="button"
            size="sm"
          >
            Descargar formato
          </Button>
          <Label htmlFor="file" className="block mt-4 mb-2">
            Archivo
          </Label>
          <Input type="file" id="file" name="file" accept=".xlsx" />
        </form>
        <DialogFooter>
          <Button type="submit" disabled={isLoading} form="import-form">
            {isLoading ? "Importando..." : "Importar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
