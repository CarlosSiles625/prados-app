/* eslint-disable @typescript-eslint/no-explicit-any */
import { InternForExport } from "@/types/intern";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatReferences(ref: string) {
  return ref.split(",").map((item) => {
    const [phone, name, relationship] = item.trim().split("-");
    return { name, phone, relationship };
  });
}

export function calculateAge(birthdate: string | Date) {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function formatInternsForExport(interns: InternForExport[]): any[] {
  return interns.map((intern) => ({
    id: intern.id,
    nombre_completo: intern.name,
    fecha_de_nacimiento: intern.birthdate,
    ciudad_de_nacimiento: intern.born_place.ciudad,
    departamento_de_nacimiento: intern.born_place.departamento,
    es_rural: intern.isRural,
    cedula: intern.cedula,
    telefono: intern.phone,
    referencias: intern.references
      .map((ref) => `${ref.name} (${ref.relationship}): ${ref.phone}`)
      .join("; "),
    estado_civil: intern.marital_status,
    direccion_ciudad: intern.direction.city,
    direccion_zona: intern.direction.zone,
    direccion_calle: intern.direction.street,
    adicciones: intern.adiccions
      .map((adiccion) => `${adiccion.name} (${adiccion.consumption_time})`)
      .join("; "),
    educacion_primaria: intern.education.primary,
    educacion_secundaria: intern.education.secondary,
    educacion_universitaria: intern.education.university,
    profesion: intern.profession || "Sin profesión",
    ocupacion: intern.ocupation,
    talentos: intern.talents.join(", "),
    nombre_del_garante: intern.guarantor_name || "null",
    telefono_del_garante: intern.guarantor_phone || "null",
    direccion_del_garante: intern.guarantor_address || "null",
    cedula_del_garante: intern.guarantor_cedula || "null",
    carrera: intern.career || "null",
    genero: intern.gender,
    fecha_de_internación: intern.interned_at,
    fecha_de_salida: intern.out_at || "null",
    estado: intern.status,
    programa_finalizado: intern.finished_program,
    propiedades_de_salida: intern.out_properties || "null",
  }));
}
export function exportInternsToExcel(
  interns: InternForExport[],
  fileName: string
): void {
  const formattedData = formatInternsForExport(interns);
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Internos");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

const expectedHeaders = [
  "id",
  "nombre_completo",
  "fecha_de_nacimiento",
  "ciudad_de_nacimiento",
  "departamento_de_nacimiento",
  "es_rural",
  "cedula",
  "telefono",
  "referencias",
  "estado_civil",
  "direccion_ciudad",
  "direccion_zona",
  "direccion_calle",
  "adicciones",
  "educacion_primaria",
  "educacion_secundaria",
  "educacion_universitaria",
  "profesion",
  "ocupacion",
  "talentos",
  "nombre_del_garante",
  "telefono_del_garante",
  "direccion_del_garante",
  "cedula_del_garante",
  "carrera",
  "genero",
  "fecha_de_internación",
  "fecha_de_salida",
  "estado",
  "programa_finalizado",
  "propiedades_de_salida",
];

export function validateExcelFormat(
  file: Buffer<ArrayBufferLike>
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const workbook = XLSX.read(file, { type: "buffer" });
      const sheetName = workbook.SheetNames[0]; // Usar la primera hoja
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }); // Leer solo cabeceras

      const headers = jsonData[0] as string[]; // Primera fila como cabeceras

      // Verificar si las cabeceras son las esperadas
      const isValid = expectedHeaders.every((header) =>
        headers.includes(header)
      );

      resolve(isValid);
    } catch (error) {
      reject(error);
    }
  });
}

export async function importInternsFromExcel(
  file: Buffer<ArrayBufferLike>,
  userId: string
): Promise<InternForExport[]> {
  const isValid = await validateExcelFormat(file);

  if (!isValid) {
    throw new Error(
      "El formato del archivo no es válido. Por favor, verifica las cabeceras."
    );
  }

  return new Promise((resolve, reject) => {
    try {
      const workbook = XLSX.read(file, { type: "buffer" });
      const sheetName = workbook.SheetNames[0]; // Usar la primera hoja
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      const interns: InternForExport[] = jsonData.map((row) => ({
        name: row["nombre_completo"],
        birthdate: row["fecha_de_nacimiento"],
        born_place: {
          ciudad: row["ciudad_de_nacimiento"],
          departamento: row["departamento_de_nacimiento"],
        },
        user: {
          connect: { id: userId },
        },
        isRural: row["es_rural"] === "Sí" || row["es_rural"] === true,
        cedula: row["cedula"],
        phone: row["telefono"],
        references: row["referencias"]
          ? row["referencias"].split("; ").map((ref: string) => {
              const [name, details] = ref.split(" (");
              const [relationship, phone] = details
                .replace(")", "")
                .split(": ");
              return { name, relationship, phone };
            })
          : [],
        marital_status: row["estado_civil"],
        direction: {
          city: row["direccion_ciudad"],
          zone: row["direccion_zona"],
          street: row["direccion_calle"],
        },
        adiccions: row["adicciones"]
          ? row["adicciones"].split("; ").map((adiccion: string) => {
              const [name, consumption_time] = adiccion.split(" (");
              return {
                name,
                consumption_time: consumption_time.replace(")", ""),
              };
            })
          : [],
        education: {
          primary:
            row["educacion_primaria"] === "Sí" ||
            row["educacion_primaria"] === true,
          secondary:
            row["educacion_secundaria"] === "Sí" ||
            row["educacion_secundaria"] === true,
          university:
            row["educacion_universitaria"] === "Sí" ||
            row["educacion_universitaria"] === true,
        },
        profession: row["profesion"] || "Sin profesión",
        ocupation: row["ocupacion"],
        talents: row["talentos"] ? row["talentos"].split(", ") : [],
        guarantor_name:
          row["nombre_del_garante"] !== "null"
            ? row["nombre_del_garante"]
            : null,
        guarantor_phone:
          row["telefono_del_garante"] !== "null"
            ? row["telefono_del_garante"]
            : null,
        guarantor_address:
          row["direccion_del_garante"] !== "null"
            ? row["direccion_del_garante"]
            : null,
        guarantor_cedula:
          row["cedula_del_garante"] !== "null"
            ? row["cedula_del_garante"]
            : null,
        career: row["carrera"] !== "null" ? row["carrera"] : null,
        gender: row["genero"],
        interned_at: row["fecha_de_internación"],
        out_at:
          row["fecha_de_salida"] !== "null" ? row["fecha_de_salida"] : null,
        status: row["estado"],
        finished_program:
          row["programa_finalizado"] === "Sí" ||
          row["programa_finalizado"] === true,
        out_properties:
          row["propiedades_de_salida"] !== "null"
            ? row["propiedades_de_salida"]
            : null,
      }));

      resolve(interns);
    } catch (error) {
      reject(error);
    }
  });
}

export function generateExampleExcel(): void {
  // Definimos las cabeceras esperadas
  const headers = [
    "nombre_completo",
    "fecha_de_nacimiento",
    "ciudad_de_nacimiento",
    "departamento_de_nacimiento",
    "es_rural",
    "cedula",
    "telefono",
    "referencias",
    "estado_civil",
    "direccion_ciudad",
    "direccion_zona",
    "direccion_calle",
    "adicciones",
    "educacion_primaria",
    "educacion_secundaria",
    "educacion_universitaria",
    "profesion",
    "ocupacion",
    "talentos",
    "nombre_del_garante",
    "telefono_del_garante",
    "direccion_del_garante",
    "cedula_del_garante",
    "carrera",
    "genero",
    "fecha_de_internación",
    "fecha_de_salida",
    "estado",
    "programa_finalizado",
    "propiedades_de_salida",
  ];

  // Creamos una hoja de trabajo con las cabeceras
  const worksheet = XLSX.utils.aoa_to_sheet([headers]);

  // Creamos el libro de trabajo
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Formato Ejemplo");

  // Exportamos el archivo Excel
  XLSX.writeFile(workbook, "formato_ejemplo.xlsx");
}
