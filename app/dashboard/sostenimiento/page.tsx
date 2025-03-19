import { getTextByType } from "@/services/text";
import { PageClient } from "./page.client";

export default async function Page() {
  const [sotenimientoM, sotenimientoF, oSostenimientoM, oSostenimientoF] =
    await Promise.all([
      getTextByType("SOSTENIMIENTO_M"),
      getTextByType("SOSTENIMIENTO_F"),
      getTextByType("ORIGINAL_SOSTENIMIENTO_M"),
      getTextByType("ORIGINAL_SOSTENIMIENTO_F"),
    ]);

  if (
    !sotenimientoM.text ||
    !sotenimientoF.text ||
    !oSostenimientoM.text ||
    !oSostenimientoF.text
  ) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto">
      <PageClient
        textM={sotenimientoM.text}
        textF={sotenimientoF.text}
        originalTextF={oSostenimientoF.text}
        originalTextM={oSostenimientoM.text}
      />
    </div>
  );
}
