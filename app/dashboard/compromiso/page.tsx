import { getTextByType } from "@/services/text";
import { PageClient } from "./page.client";

export default async function Page() {
  const [compromisoM, compromisoF, oCompromisoM, oCompromisoF] =
    await Promise.all([
      getTextByType("COMPROMISO_M"),
      getTextByType("COMPROMISO_F"),
      getTextByType("ORIGINAL_COMPROMISO_M"),
      getTextByType("ORIGINAL_COMPROMISO_F"),
    ]);

  if (
    !compromisoM.text ||
    !compromisoF.text ||
    !oCompromisoM.text ||
    !oCompromisoF.text
  ) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto">
      <PageClient
        textM={compromisoM.text}
        textF={compromisoF.text}
        originalTextF={oCompromisoF.text}
        originalTextM={oCompromisoM.text}
      />
    </div>
  );
}
