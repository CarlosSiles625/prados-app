"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useQueryState } from "nuqs";

export function SearchIntern() {
  const [searchBy, setSearchBy] = useQueryState("searchBy");
  const [q, setQ] = useQueryState("q", {
    throttleMs: 500,
    shallow: false,
  });
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <Input
        value={q ?? ""}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar por cédula o nombre"
      />
      <Select
        value={searchBy ?? ""}
        onValueChange={(val) => {
          if (val) {
            setSearchBy(val);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Buscar por..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cedula">Cedula</SelectItem>
          <SelectItem value="name">Nombre</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
