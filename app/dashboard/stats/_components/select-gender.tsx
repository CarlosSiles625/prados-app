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

const GENDERS = [
  {
    id: "F",
    name: "Femenino",
  },
  {
    id: "M",
    name: "Masculino",
  },
  {
    id: "A",
    name: "Ambos",
  },
];
export function SelectGender() {
  const [gender, setGender] = useQueryState("gender", {
    shallow: false,
    defaultValue: "A",
  });
  return (
    <div>
      <Label
        htmlFor="year-select"
        className="block text-sm font-medium text-gray-700"
      >
        Selecciona un género:
      </Label>
      <Select onValueChange={(value) => setGender(value)} value={gender ?? ""}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Años</SelectLabel>
            {GENDERS.map((g) => (
              <SelectItem key={g.id} value={g.id}>
                {g.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
