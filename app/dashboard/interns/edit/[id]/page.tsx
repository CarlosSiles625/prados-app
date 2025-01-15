import { getInternById } from "@/services/interns";
import { EditForm } from "../../_components/interns/edit/edit-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { intern, error } = await getInternById(id);
  if (error || !intern) {
    return <div>Error: {error ?? "Error desconocido"}</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-center font-semibold text-xl">
        Editar Datos del interno
      </h1>
      <EditForm intern={intern} />
    </div>
  );
}
