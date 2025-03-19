import { getTextByType } from "@/services/text";
import PageClient from "./page.client";

export default async function Page() {
  const { text, error } = await getTextByType("FILOSOFIA");
  const { text: oText, error: oError } = await getTextByType(
    "ORIGINAL_FILOSOFIA"
  );
  if (!text && !error) return <div>Cargando...</div>;
  if (error || !text) return <div>{error ?? "No se encontró"}</div>;
  if (!oText && !oError) return <div>Cargando...</div>;
  if (oError || !oText) return <div>{oError ?? "No se encontró"}</div>;

  return (
    <div>
      <PageClient
        initialHtml={text.textHtml}
        id={text.id}
        originalText={oText}
      />
    </div>
  );
}
