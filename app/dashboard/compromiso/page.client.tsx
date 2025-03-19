"use client";

import { RenderHtml } from "@/components/render-html";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { updateText } from "@/services/text";
import { Text } from "@/types/text";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  textM: Text;
  originalTextM: Text;
  textF: Text;
  originalTextF: Text;
};

export function PageClient({
  textM,
  originalTextM,
  originalTextF,
  textF,
}: Props) {
  const router = useRouter();

  const handleSaveM = async (html: string) => {
    const data = await updateText(textM.id, html);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Guardado");
      router.refresh();
    }
  };

  const handleSaveF = async (html: string) => {
    const data = await updateText(textF.id, html);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Guardado");
      router.refresh();
    }
  };

  const handleResetM = async () => {
    const data = await updateText(textM.id, originalTextM.textHtml);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Guardado");
      router.refresh();
    }
  };

  const handleResetF = async () => {
    const data = await updateText(textF.id, originalTextF.textHtml);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Guardado");
      router.refresh();
    }
  };

  return (
    <div className="grid grid-cols-1 place-content-center place-items-center gap-6 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Compromiso (Varones)</h2>
          <RichTextEditor initialHtml={textM.textHtml} onSave={handleSaveM} />
          <Button onClick={handleResetM}>Reset</Button>
        </div>
        <div className="border border-gray-200 p-4">
          <RenderHtml htmlString={textM.textHtml} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Compromiso (Mujeres)</h2>
          <RichTextEditor initialHtml={textF.textHtml} onSave={handleSaveF} />
          <Button onClick={handleResetF}>Reset</Button>
        </div>
        <div className="border border-gray-200 p-4">
          <RenderHtml htmlString={textF.textHtml} />
        </div>
      </div>
    </div>
  );
}
