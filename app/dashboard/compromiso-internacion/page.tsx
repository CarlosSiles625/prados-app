import { getTextByType } from "@/services/text";
import { PageClient } from "./page.client";

export default async function Page() {
  const [icompromisoM, icompromisoF, oICompromisoM, oICompromisoF] =
    await Promise.all([
      getTextByType("COMPROMISO_INTERNACION_M"),
      getTextByType("COMPROMISO_INTERNACION_F"),
      getTextByType("ORIGINAL_COMPROMISO_INTERNACION_M"),
      getTextByType("ORIGINAL_COMPROMISO_INTERNACION_F"),
    ]);

  if (
    !icompromisoM.text ||
    !icompromisoF.text ||
    !oICompromisoM.text ||
    !oICompromisoF.text
  ) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto">
      <PageClient
        textM={icompromisoM.text}
        textF={icompromisoF.text}
        originalTextF={oICompromisoF.text}
        originalTextM={oICompromisoM.text}
      />
    </div>
  );
}
