import { z } from "zod";

export const internSchema = z.object({
  name: z.string().nonempty("El nombre es requerido"),
  birthdate: z.string().nonempty("La fecha de nacimiento es requerida"),
  interned_at: z.string(),
  born_place: z.string().nonempty("El lugar de nacimiento es requerido"),
  cedula: z.string().nonempty("La cédula es requerida"),
  phone: z.string(),
  references: z
    .string()
    .nonempty("Las referencias son requeridas")
    .regex(
      /^(\d{6,}-[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+-[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+)(,\d{6,}-[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+-[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+)*$/,
      {
        message:
          "Cada entrada debe seguir el formato Teléfono-Nombre-Relación y estar separada por comas. Ejemplo: 734734-Roberto Perez-Hermano,455534-Carlos Siles Vedia-Padre",
      }
    ),
  marital_status: z.string().nonempty("El estado civil es requerido"),
  street: z.string().nonempty("La calle es requerida"),
  zone: z.string(),
  city: z.string().nonempty("La ciudad es requerida"),
  profession: z.string(),
  talents: z.string(),
  ocupation: z.string(),
  guarantor_name: z.string(),
  primary: z.boolean(),
  secondary: z.boolean(),
  university: z.boolean(),
});
export type InternSchema = z.infer<typeof internSchema>;
