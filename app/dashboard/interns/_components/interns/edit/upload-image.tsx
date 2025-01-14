"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UploadImage({ id }: { id: string }) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("Imagen subida con éxito");
      router.push(`/dashboard/interns/view/${id}`);
    } else {
      toast.error(data.error);
      console.log(data.error);
    }
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input type="hidden" name="internId" value={id} />
      <div>
        <label htmlFor="internImg">
          <Button type="button" variant="outline" asChild size="sm">
            <span>Seleccionar imagen</span>
          </Button>
        </label>
        <input
          id="internImg"
          type="file"
          name="internImg"
          className="sr-only"
          accept="image/*"
        />
      </div>
      <Button type="submit" size="sm">
        Guardar
      </Button>
    </form>
  );
}
