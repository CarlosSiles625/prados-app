"use client";

import { Button } from "@/components/ui/button";
import { exportInternsToExcel } from "@/lib/utils";

import { exportInterns } from "@/services/export";
import { useState } from "react";

export function ExportBtn() {
  const [loading, setLoading] = useState(false);
  const handleExport = async () => {
    try {
      setLoading(true);

      // 1. Obtener datos del endpoint
      const { interns: data, error, ok } = await exportInterns();
      if (!ok || error) {
        throw new Error("Error en la exportación");
      }

      exportInternsToExcel(data, `internos-${new Date().toISOString()}`);
    } catch (error) {
      console.log("Error en la exportación:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button onClick={handleExport} disabled={loading}>
      {loading ? "Exportando..." : "Exportar"}
    </Button>
  );
}
