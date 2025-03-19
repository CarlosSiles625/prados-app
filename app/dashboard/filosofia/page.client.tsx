"use client";

import { RenderHtml } from "@/components/render-html";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Text } from "@/types/text";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PageClient({
  initialHtml,
  originalText,
  id,
}: {
  initialHtml: string;
  originalText: Text;
  id: number;
}) {
  const router = useRouter();
  const handleSave = async (html: string) => {
    const resp = await fetch(`/api/text/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ textHtml: html }),
    });
    const data = await resp.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Guardado");
      router.refresh();
    }
  };

  const handleReset = async () => {
    const resp = await fetch(`/api/text/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ textHtml: originalText.textHtml }),
    });
    const data = await resp.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Reset");
      router.refresh();
    }
  };
  return (
    <div className="grid grid-cols-2 gap-8 p-4">
      <div className="container space-y-4">
        <RichTextEditor initialHtml={initialHtml} onSave={handleSave} />
        <Button onClick={handleReset}>Resetear</Button>
      </div>
      <RenderHtml htmlString={initialHtml} />
    </div>
  );
}
