/* eslint-disable @typescript-eslint/no-explicit-any */
import { InternForExport } from "@/types/intern";

export async function exportInterns() {
  const resp = await fetch("/api/export", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await resp.json()) as {
    ok: boolean;
    interns: InternForExport[];
    error: any;
  };
}
