import { getInterns, InternsQuery } from "@/services/interns";
import { InternsTable } from "./_components/interns/table/interns-table";
import { InternsType } from "@/types/intern";
import { ExportBtn } from "./_components/export/export-btn";
import { ImportModal } from "./_components/import/import-modal";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<InternsQuery>;
}) {
  const params = await searchParams;
  const data = await getInterns(params);
  if (data?.error || !data?.interns) {
    <div className="flex flex-col gap-4 container mx-auto p-2">
      <h1 className="text-xl font-semibold">Gestión de internos</h1>
      <p>Error:{data?.error}</p>
    </div>;
  }
  return (
    <div className="flex flex-col gap-4 container mx-auto p-2">
      <h1 className="text-xl font-semibold">Gestión de internos</h1>
      <div className="flex gap-4 justify-end items-center">
        <ImportModal />
        <ExportBtn />
      </div>
      <InternsTable
        interns={data?.interns as unknown as InternsType[]}
        count={data.count}
      />
    </div>
  );
}
