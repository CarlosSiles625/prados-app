"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";

export function YearSelect() {
  const startYear = 1994; // Año inicial
  const endYear = new Date().getFullYear(); // Año actual
  const [year, setYear] = useQueryState("year", {
    shallow: false,
  });

  // Generar una lista de años
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  return (
    <div>
      <Label
        htmlFor="year-select"
        className="block text-sm font-medium text-gray-700"
      >
        Selecciona un año:
      </Label>
      <Select onValueChange={(value) => setYear(value)} value={year ?? ""}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Años</SelectLabel>
            {years.map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}
              </SelectItem>
            ))}
            <SelectItem value="all">Todos</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
