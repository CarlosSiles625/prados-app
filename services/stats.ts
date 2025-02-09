/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ABANDONMENT_REASONS,
  ADICCTIONS,
  OCCUPATIONS,
  PROFESSIONS,
} from "@/constants/intern";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

const DEPARTAMENTOS = [
  "La Paz",
  "Cochabamba",
  "Santa Cruz",
  "Chuquisaca",
  "Oruro",
  "Potosi",
  "Tarija",
  "Beni",
  "Pando",
];

export type Gender = "F" | "M" | "A" | undefined | null;
export type Year = number | "all" | undefined | null;

export async function getLocationStatistics(year: Year, gender: Gender) {
  try {
    // Normalizar parámetros
    const normalizedYear = year === "all" || !year ? null : Number(year);
    const normalizedGender = gender === "A" || !gender ? null : gender;

    // Construir condiciones dinámicas
    const yearCondition =
      normalizedYear !== null && normalizedYear !== undefined
        ? Prisma.sql`EXTRACT(YEAR FROM "interned_at") = ${normalizedYear}`
        : Prisma.sql`1=1`;

    const genderCondition =
      normalizedGender === "F" || normalizedGender === "M"
        ? Prisma.sql`"gender" = ${normalizedGender}`
        : Prisma.sql`1=1`;

    const rawData: any[] = await prisma.$queryRaw`
      SELECT 
        (born_place->>'departamento') as departamento,
        COUNT(CASE WHEN "isRural" = false THEN 1 END) as urbano,
        COUNT(CASE WHEN "isRural" = true THEN 1 END) as rural
      FROM "Intern"
      WHERE
        ${yearCondition}
        AND
        ${genderCondition}
      GROUP BY (born_place->>'departamento')
      ORDER BY departamento
    `;

    // Mapear resultados a todos los departamentos
    const departamentosData = DEPARTAMENTOS.map((depto) => ({
      departamento: depto,
      urbano: 0,
      rural: 0,
    }));

    rawData.forEach((row) => {
      const index = DEPARTAMENTOS.findIndex(
        (d) => d.toLowerCase() === row.departamento?.toLowerCase()
      );
      if (index !== -1) {
        departamentosData[index].urbano = Number(row.urbano) || 0;
        departamentosData[index].rural = Number(row.rural) || 0;
      }
    });

    // Calcular totales
    const total = departamentosData.reduce(
      (acc, curr) => ({
        urbano: acc.urbano + curr.urbano,
        rural: acc.rural + curr.rural,
      }),
      { urbano: 0, rural: 0 }
    );

    return {
      data: departamentosData,
      total: {
        urbano: total.urbano,
        rural: total.rural,
        general: total.urbano + total.rural,
      },
    };
  } catch (error) {
    console.error("Error en getLocationStatistics:", error);
    return null;
  }
}

export async function getProfessionsStats(year: Year, gender: Gender) {
  try {
    const normalizedYear = year === "all" || !year ? null : Number(year);
    const normalizedGender = gender === "A" || !gender ? null : gender;

    // Construir condiciones
    const yearCondition = normalizedYear
      ? Prisma.sql`EXTRACT(YEAR FROM "interned_at") = ${normalizedYear}`
      : Prisma.sql`1=1`;

    const genderCondition = normalizedGender
      ? Prisma.sql`"gender" = ${normalizedGender}`
      : Prisma.sql`1=1`;

    // Consulta SQL mejorada
    const rawData: any[] = await prisma.$queryRaw`
      SELECT 
        COALESCE("profession", 'Sin profesión') as profession,
        COUNT(*)::integer as count
      FROM "Intern"
      WHERE
        ${yearCondition}
        AND
        ${genderCondition}
      GROUP BY "profession"
    `;

    // Mapear resultados a las categorías oficiales
    const professionMap = new Map(
      PROFESSIONS.map((p) => [p.name.toLowerCase(), p])
    );

    const processedData = rawData.reduce((acc, row) => {
      const input = row.profession?.toLowerCase().trim() || "";
      let found = false;

      // Buscar coincidencias exactas o parciales
      for (const [key, profession] of professionMap) {
        if (input.includes(key.replace("/a", "").replace("/o", "").trim())) {
          acc[profession.name] = (acc[profession.name] || 0) + row.count;
          found = true;
          break;
        }
      }

      if (!found) acc["Otros"] = (acc["Otros"] || 0) + row.count;
      return acc;
    }, {});

    // Crear estructura final con todas las profesiones
    let finalData = PROFESSIONS.map((profession) => ({
      id: profession.id,
      name: profession.name,
      count: processedData[profession.name] || 0,
    }));

    //eliminar profesiones con 0
    finalData = finalData.filter((item) => item.count > 0);

    // Calcular total
    const total = finalData.reduce((sum, item) => sum + item.count, 0);
    return { data: finalData, total };
  } catch (error) {
    console.log("Error en getProfessionsStats:", error);
    return null;
  }
}

export async function getOccupationStatistics(year: Year, gender: Gender) {
  try {
    // Normalizar parámetros
    const normalizedYear = year === "all" || !year ? null : Number(year);
    const normalizedGender = gender === "A" || !gender ? null : gender;

    // Construir condiciones
    const yearCondition = normalizedYear
      ? Prisma.sql`EXTRACT(YEAR FROM "interned_at") = ${normalizedYear}`
      : Prisma.sql`1=1`;

    const genderCondition = normalizedGender
      ? Prisma.sql`"gender" = ${normalizedGender}`
      : Prisma.sql`1=1`;

    // Consulta SQL para ocupaciones (solo donde no hay profesión)
    const rawData: any[] = await prisma.$queryRaw`
    SELECT 
      COALESCE("ocupation", 'Sin ocupación') as occupation,
      COUNT(*)::integer as count
    FROM "Intern"
    WHERE
      ${yearCondition}
      AND
      ${genderCondition}
      AND
      ("profession" IS NULL OR "profession" = 'Sin profesión') 
    GROUP BY "ocupation"
  `;
    // Mapear resultados a las categorías oficiales
    const occupationMap = new Map(
      OCCUPATIONS.map((o) => [o.name.toLowerCase(), o])
    );

    const processedData = rawData.reduce((acc, row) => {
      const input = row.occupation?.toLowerCase().trim() || "";
      let found = false;

      // Buscar coincidencias considerando variaciones
      for (const [key, occupation] of occupationMap) {
        const cleanKey = key
          .replace("/a", "")
          .replace("/o", "")
          .replace("á", "a")
          .trim();

        if (input.includes(cleanKey)) {
          acc[occupation.name] = (acc[occupation.name] || 0) + row.count;
          found = true;
          break;
        }
      }

      if (!found) acc["Otros"] = (acc["Otros"] || 0) + row.count;
      return acc;
    }, {});

    // Crear estructura final con todas las ocupaciones
    let finalData = OCCUPATIONS.map((occupation) => ({
      id: occupation.id,
      name: occupation.name,
      count: processedData[occupation.name] || 0,
    }));

    // Eliminar ocupaciones con 0
    finalData = finalData.filter((item) => item.count > 0);

    // Calcular total
    const total = finalData.reduce((sum, item) => sum + item.count, 0);

    return {
      data: finalData,
      total,
      error: null,
    };
  } catch (error) {
    console.error("Error en getOccupationStatistics:", error);
    return null;
  }
}

export interface EducationStats {
  nivel: string;
  cantidad: number;
}

export async function getEducationStatistics(year: Year, gender: Gender) {
  try {
    // Normalizar parámetros
    const normalizedYear = year === "all" || !year ? null : Number(year);
    const normalizedGender = gender === "A" || !gender ? null : gender;

    // Construir filtros
    const whereConditions: any = {};

    if (normalizedYear) {
      whereConditions.interned_at = {
        gte: new Date(`${normalizedYear}-01-01`),
        lt: new Date(`${normalizedYear + 1}-01-01`),
      };
    }

    if (normalizedGender) {
      whereConditions.gender = normalizedGender;
    }

    // Obtener datos con filtros
    const interns = await prisma.intern.findMany({
      where: whereConditions,
      select: {
        education: true,
      },
    });

    // Inicializar contadores
    const counts = {
      primaria: 0,
      secundaria: 0,
      universitaria: 0,
      sinEstudios: 0,
    };

    // Procesar educación
    interns.forEach((intern) => {
      const education =
        (intern.education as {
          primary?: boolean;
          secondary?: boolean;
          university?: boolean;
        }) || {};

      const hasPrimary = education.primary ?? false;
      const hasSecondary = education.secondary ?? false;
      const hasUniversity = education.university ?? false;

      if (hasPrimary) counts.primaria++;
      if (hasSecondary) counts.secundaria++;
      if (hasUniversity) counts.universitaria++;

      if (!hasPrimary && !hasSecondary && !hasUniversity) {
        counts.sinEstudios++;
      }
    });

    // Formatear respuesta
    const result: EducationStats[] = [
      { nivel: "Primaria", cantidad: counts.primaria },
      { nivel: "Secundaria", cantidad: counts.secundaria },
      { nivel: "Universitaria", cantidad: counts.universitaria },
      { nivel: "Sin estudios", cantidad: counts.sinEstudios },
    ];

    const total = interns.length;

    return {
      data: result,
      total,
      error: null,
    };
  } catch (error) {
    console.error("Error en getEducationStatistics:", error);
    return {
      data: [],
      total: 0,
      error: "Error al obtener estadísticas de educación",
    };
  }
}

export interface AddictionStat {
  id: number;
  name: string;
  cantidad: number;
}

export async function getAddictionStatistics(year: Year, gender: Gender) {
  try {
    // Normalizar parámetros

    const normalizedYear = year === "all" || !year ? null : Number(year);
    const normalizedGender = gender === "A" || !gender ? null : gender;

    // Construir condiciones
    const yearCondition = normalizedYear
      ? Prisma.sql`EXTRACT(YEAR FROM "interned_at") = ${normalizedYear}`
      : Prisma.sql`1=1`;

    const genderCondition = normalizedGender
      ? Prisma.sql`"gender" = ${normalizedGender}`
      : Prisma.sql`1=1`;

    // Consulta SQL
    const rawData: any[] = await prisma.$queryRaw`
    WITH internos_filtrados AS (
      SELECT id, adiccions
      FROM "Intern"
      WHERE 
        ${yearCondition}
        AND ${genderCondition}
    )
    SELECT 
      LOWER(TRIM((adiccion::jsonb)->>'name')) as adiccion_name, -- Cast explícito
      COUNT(*)::integer as cantidad,
      COUNT(DISTINCT interno_id) as total_internos
    FROM (
      SELECT
        i.id as interno_id,
        unnest(i.adiccions::jsonb[]) as adiccion -- Cast explícito aquí
      FROM internos_filtrados i
    ) subq
    GROUP BY LOWER(TRIM((adiccion::jsonb)->>'name'))
  `;
    // Mapeo de adicciones
    const adiccionesMap = new Map<string, number>(
      ADICCTIONS.map((a) => [a.name.toLowerCase(), 0])
    );

    let total = 0;
    const otrosId = ADICCTIONS.find((a) => a.name === "Otros")?.id || 20;

    rawData.forEach((row) => {
      const nombre = row.adiccion_name.toLowerCase();
      const mapped = ADICCTIONS.find(
        (a) =>
          a.name.toLowerCase() === nombre ||
          nombre.startsWith(a.name.toLowerCase())
      );

      if (mapped) {
        adiccionesMap.set(
          mapped.name.toLowerCase(),
          (adiccionesMap.get(mapped.name.toLowerCase()) || 0) +
            Number(row.cantidad)
        );
      } else {
        const current = adiccionesMap.get("otros") || 0;
        adiccionesMap.set("otros", current + Number(row.cantidad));
      }

      if (total === 0 && row.total_internos) {
        total = Number(row.total_internos);
      }
    });

    // Formatear respuesta
    let result = ADICCTIONS.map((adiccion) => ({
      id: adiccion.id,
      name: adiccion.name,
      cantidad: adiccionesMap.get(adiccion.name.toLowerCase()) || 0,
    }))
      .filter((a) => a.name !== "Otros") // Excluir Otros temporalmente
      .concat({
        id: otrosId,
        name: "Otros",
        cantidad: adiccionesMap.get("otros") || 0,
      });

    // quitar adicciones con 0
    result = result.filter((item) => item.cantidad > 0);

    return {
      data: result.sort((a, b) => b.cantidad - a.cantidad),
      total,
      error: null,
    };
  } catch (error) {
    console.error("Error en getAddictionStatistics:", error);
    return {
      data: ADICCTIONS.map((a) => ({ ...a, cantidad: 0 })),
      total: 0,
      error: "Error al obtener estadísticas de adicciones",
    };
  }
}

export interface TimeStat {
  intervalo: string;
  cantidad: number;
}
export async function getConsumptionTimeStats(year: Year, gender: Gender) {
  try {
    // Normalizar parámetros
    const normalizedYear = year === "all" || !year ? null : Number(year);
    const normalizedGender = gender === "A" || !gender ? null : gender;

    // Construir condiciones
    const yearCondition = normalizedYear
      ? Prisma.sql`EXTRACT(YEAR FROM "interned_at") = ${normalizedYear}`
      : Prisma.sql`1=1`;

    const genderCondition = normalizedGender
      ? Prisma.sql`"gender" = ${normalizedGender}`
      : Prisma.sql`1=1`;

    // Consulta SQL para obtener los tiempos de consumo
    const rawData: any[] = await prisma.$queryRaw`
      WITH internos_filtrados AS (
        SELECT id, adiccions
        FROM "Intern"
        WHERE 
          ${yearCondition}
          AND ${genderCondition}
      )
      SELECT 
        LOWER(TRIM(adiccion->>'consumption_time')) as tiempo,
        COUNT(*)::integer as cantidad
      FROM (
        SELECT
          i.id,
          unnest(i.adiccions::jsonb[]) as adiccion
        FROM internos_filtrados i
      ) subq
      GROUP BY LOWER(TRIM(adiccion->>'consumption_time'))
    `;

    // Función para normalizar y convertir a años
    const parseTimeToYears = (timeString: string) => {
      const normalized = timeString
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
        .toLowerCase()
        .replace(/s/g, ""); // Eliminar plurales

      const yearsMatch = normalized.match(/(\d+)\s*ano?/);
      const monthsMatch = normalized.match(/(\d+)\s*mes/);
      const weeksMatch = normalized.match(/(\d+)\s*semana/);
      const daysMatch = normalized.match(/(\d+)\s*dia/);

      const years = yearsMatch ? parseInt(yearsMatch[1]) : 0;
      const months = monthsMatch ? parseInt(monthsMatch[1]) : 0;
      const weeks = weeksMatch ? parseInt(weeksMatch[1]) : 0;
      const days = daysMatch ? parseInt(daysMatch[1]) : 0;

      return years + months / 12 + weeks / 52 + days / 365;
    };

    // Inicializar contadores
    const intervalos = {
      "0-1": 0,
      "2-3": 0,
      "4-7": 0,
      "7+": 0,
    };

    rawData.forEach((row) => {
      const tiempo = parseTimeToYears(row.tiempo);
      const cantidad = Number(row.cantidad);

      if (tiempo <= 1) intervalos["0-1"] += cantidad;
      else if (tiempo <= 3) intervalos["2-3"] += cantidad;
      else if (tiempo <= 7) intervalos["4-7"] += cantidad;
      else intervalos["7+"] += cantidad;
    });

    // Formatear respuesta
    const result: TimeStat[] = [
      { intervalo: "0-1 año", cantidad: intervalos["0-1"] },
      { intervalo: "2-3 años", cantidad: intervalos["2-3"] },
      { intervalo: "4-7 años", cantidad: intervalos["4-7"] },
      { intervalo: "7+ años", cantidad: intervalos["7+"] },
    ];

    const total = result.reduce((sum, item) => sum + item.cantidad, 0);

    return {
      data: result,
      total,
      error: null,
    };
  } catch (error) {
    console.error("Error en getConsumptionTimeStats:", error);
    return {
      data: [],
      total: 0,
      error: "Error al obtener estadísticas de tiempo de consumo",
    };
  }
}

export interface AgeDistribution {
  intervalo: string;
  cantidad: number;
}
export async function getAgeDistribution(year: Year, gender: Gender) {
  try {
    // Normalizar parámetros
    const normalizedYear = year === "all" || !year ? null : Number(year);
    const normalizedGender = gender === "A" || !gender ? null : gender;

    // Construir condiciones
    const yearCondition = normalizedYear
      ? Prisma.sql`EXTRACT(YEAR FROM "interned_at") = ${normalizedYear}`
      : Prisma.sql`1=1`;

    const genderCondition = normalizedGender
      ? Prisma.sql`"gender" = ${normalizedGender}`
      : Prisma.sql`1=1`;

    // Consulta SQL para calcular edades
    const rawData: any[] = await prisma.$queryRaw`
      SELECT 
        CASE
          WHEN age BETWEEN 14 AND 19 THEN '14-19 años'
          WHEN age BETWEEN 20 AND 29 THEN '20-29 años'
          WHEN age BETWEEN 30 AND 39 THEN '30-39 años'
          WHEN age BETWEEN 40 AND 49 THEN '40-49 años'
          WHEN age BETWEEN 50 AND 59 THEN '50-59 años'
          ELSE '60+ años'
        END as intervalo,
        COUNT(*)::integer as cantidad
      FROM (
        SELECT 
          EXTRACT(YEAR FROM AGE(birthdate))::integer as age
        FROM "Intern"
        WHERE
          ${yearCondition}
          AND ${genderCondition}
      ) as edades
      GROUP BY intervalo
      ORDER BY MIN(age)
    `;

    // Mapear todos los intervalos
    const intervals = [
      "14-19 años",
      "20-29 años",
      "30-39 años",
      "40-49 años",
      "50-59 años",
      "60+ años",
    ];

    const result = intervals.map((interval) => ({
      intervalo: interval,
      cantidad: Number(
        rawData.find((d) => d.intervalo === interval)?.cantidad || 0
      ),
    }));

    // Calcular total real de internos
    const totalResult = await prisma.$queryRaw<{ total: number }[]>`
      SELECT COUNT(*)::integer as total
      FROM "Intern"
      WHERE
        ${yearCondition}
        AND ${genderCondition}
    `;

    return {
      data: result,
      total: totalResult[0].total,
      error: null,
    };
  } catch (error) {
    console.error("Error en getAgeDistribution:", error);
    return {
      data: [],
      total: 0,
      error: "Error al obtener distribución por edad",
    };
  }
}

export interface AdmissionStatusStats {
  recuperados: number;
  abandonos: {
    [key: string]: number;
  };
  pendientes: number;
  total: number;
  error: string | null;
}
export async function getAdmissionStatusStats(
  year: Year,
  gender: Gender
): Promise<AdmissionStatusStats> {
  try {
    const normalizedYear = year === "all" || !year ? null : Number(year);
    const normalizedGender = gender === "A" || !gender ? null : gender;

    // Construir condiciones de filtrado
    const whereConditions: Prisma.InternWhereInput = {};

    if (normalizedYear) {
      whereConditions.interned_at = {
        gte: new Date(`${normalizedYear}-01-01`),
        lt: new Date(`${normalizedYear + 1}-01-01`),
      };
    }

    if (normalizedGender) {
      whereConditions.gender = normalizedGender;
    }

    // Obtener todos los registros con los filtros
    const interns = await prisma.intern.findMany({
      where: whereConditions,
      select: {
        status: true,
        out_properties: true,
      },
    });

    // Inicializar contadores
    const stats = {
      recuperados: 0,
      pendientes: 0,
      abandonos: {
        Estudios: 0,
        Trabajo: 0,
        Familiar: 0,
        Salud: 0,
        Escapó: 0,
        "Voluntad propia": 0,
        Otros: 0,
      },
      error: null,
    };

    // Procesar cada registro
    interns.forEach((intern) => {
      if (intern.status === "Alta") {
        stats.recuperados++;
      } else if (intern.status === "Activo") {
        stats.pendientes++;
      } else if (intern.status === "Baja" && intern.out_properties) {
        const reason =
          (intern.out_properties as any)?.reason?.toLowerCase() || "otros";

        const matchedReason =
          (ABANDONMENT_REASONS.find(
            (r) => r.name.toLowerCase() === reason.toLowerCase().trim()
          )?.name as keyof typeof stats.abandonos) || "Otros";

        stats.abandonos[matchedReason] =
          (stats.abandonos[matchedReason] || 0) + 1;
      }
    });

    // Calcular total
    const total =
      stats.recuperados +
      stats.pendientes +
      Object.values(stats.abandonos).reduce((a, b) => a + b, 0);

    return {
      ...stats,
      total,
    };
  } catch (error) {
    console.error("Error obteniendo estadísticas de internación:", error);
    return {
      recuperados: 0,
      pendientes: 0,
      abandonos: {
        Estudios: 0,
        Trabajo: 0,
        Familiar: 0,
        Salud: 0,
        Escapó: 0,
        "Voluntad propia": 0,
        Otros: 0,
      },
      total: 0,
      error: "Error al obtener estadísticas de internación",
    };
  }
}
// export interface DurationStat {
//   intervalo: string;
//   cantidad: number;
// }
// export async function getInternmentDurationStats(year: Year, gender: Gender) {
//   try {
//     // Normalizar parámetros
//     const normalizedYear = year === "all" || !year ? null : Number(year);
//     const normalizedGender = gender === "A" || !gender ? null : gender;

//     // Construir condiciones
//     const yearCondition = normalizedYear
//       ? Prisma.sql`EXTRACT(YEAR FROM "interned_at") = ${normalizedYear}`
//       : Prisma.sql`1=1`;

//     const genderCondition = normalizedGender
//       ? Prisma.sql`"gender" = ${normalizedGender}`
//       : Prisma.sql`1=1`;

//     // Consulta SQL para calcular duración
//     const rawData: any[] = await prisma.$queryRaw`
//       SELECT
//         CASE
//           WHEN months <= 3 THEN '0-3 meses'
//           WHEN months BETWEEN 4 AND 8 THEN '4-8 meses'
//           WHEN months BETWEEN 9 AND 12 THEN '8-12 meses'
//           WHEN months BETWEEN 13 AND 24 THEN '1-2 años'
//           WHEN months BETWEEN 25 AND 48 THEN '2-4 años'
//           ELSE '5+ años'
//         END as intervalo,
//         COUNT(*)::integer as cantidad
//       FROM (
//         SELECT
//           EXTRACT(YEAR FROM AGE(COALESCE(out_at, NOW()), interned_at)) * 12 +
//           EXTRACT(MONTH FROM AGE(COALESCE(out_at, NOW()), interned_at)) as months
//         FROM "Intern"
//         WHERE
//           ${yearCondition}
//           AND ${genderCondition}
//       ) as duraciones
//       GROUP BY intervalo
//       ORDER BY MIN(months)
//     `;

//     // Mapear todos los intervalos
//     const intervalos = [
//       "0-3 meses",
//       "4-8 meses",
//       "8-12 meses",
//       "1-2 años",
//       "2-4 años",
//       "5+ años",
//     ];

//     const result = intervalos.map((intervalo) => ({
//       intervalo,
//       cantidad: Number(
//         rawData.find((d) => d.intervalo === intervalo)?.cantidad || 0
//       ),
//     }));

//     // Calcular total según la suma de las categorías
//     const total = result.reduce((sum, item) => sum + item.cantidad, 0);

//     return {
//       data: result,
//       total,
//       error: null,
//     };
//   } catch (error) {
//     console.error("Error en getInternmentDurationStats:", error);
//     return {
//       data: [],
//       total: 0,
//       error: "Error al obtener estadísticas de duración",
//     };
//   }
// }

export interface DurationStat {
  intervalo: string;
  cantidad: number;
  status: string;
}

export async function getInternmentDurationStats(year: Year, gender: Gender) {
  try {
    const normalizedYear = year === "all" || !year ? null : Number(year);
    const normalizedGender = gender === "A" || !gender ? null : gender;

    const yearCondition = normalizedYear
      ? Prisma.sql`EXTRACT(YEAR FROM "interned_at") = ${normalizedYear}`
      : Prisma.sql`1=1`;

    const genderCondition = normalizedGender
      ? Prisma.sql`"gender" = ${normalizedGender}`
      : Prisma.sql`1=1`;

    const rawData: any[] = await prisma.$queryRaw`
      SELECT 
        CASE
          WHEN months <= 1 THEN '0-1 mes'
          WHEN months BETWEEN 2 AND 3 THEN '1-3 meses'
          WHEN months BETWEEN 4 AND 6 THEN '3-6 meses'
          WHEN months BETWEEN 7 AND 12 THEN '6-12 meses'
          WHEN months BETWEEN 13 AND 18 THEN '1-1.5 años'
          WHEN months BETWEEN 19 AND 24 THEN '1.5-2 años'
          ELSE '2+ años'
        END as intervalo,
        status,
        COUNT(*)::integer as cantidad
      FROM (
        SELECT 
          EXTRACT(YEAR FROM AGE(COALESCE(out_at, NOW()), interned_at)) * 12 +
          EXTRACT(MONTH FROM AGE(COALESCE(out_at, NOW()), interned_at)) as months,
          status
        FROM "Intern"
        WHERE 
          ${yearCondition}
          AND ${genderCondition}
      ) as duraciones
      GROUP BY intervalo, status
      ORDER BY MIN(months)
    `;

    const intervalos = [
      "0-1 mes",
      "1-3 meses",
      "3-6 meses",
      "6-12 meses",
      "1-1.5 años",
      "1.5-2 años",
      "2+ años",
    ];

    const statuses = ["Activo", "Baja", "Alta"];

    const result = intervalos.flatMap((intervalo) =>
      statuses.map((status) => ({
        intervalo,
        status,
        cantidad: Number(
          rawData.find((d) => d.intervalo === intervalo && d.status === status)
            ?.cantidad || 0
        ),
      }))
    );

    const total = result.reduce((sum, item) => sum + item.cantidad, 0);

    return {
      data: result,
      total,
      error: null,
    };
  } catch (error) {
    console.error("Error en getInternmentDurationStats:", error);
    return {
      data: [],
      total: 0,
      error: "Error al obtener estadísticas de duración",
    };
  }
}

export interface CareerStat {
  carrera: string;
  cantidad: number;
}

export async function getInternsByCareerStats(year: Year, gender: Gender) {
  try {
    const normalizedYear = year === "all" || !year ? null : Number(year);
    const normalizedGender = gender === "A" || !gender ? null : gender;

    const yearCondition = normalizedYear
      ? Prisma.sql`EXTRACT(YEAR FROM "interned_at") = ${normalizedYear}`
      : Prisma.sql`1=1`;

    const genderCondition = normalizedGender
      ? Prisma.sql`"gender" = ${normalizedGender}`
      : Prisma.sql`1=1`;

    const rawData: any[] = await prisma.$queryRaw`
      WITH filtered_interns AS (
        SELECT career
        FROM "Intern"
        WHERE ${yearCondition} AND ${genderCondition}
      ),
      top_careers AS (
        SELECT career
        FROM filtered_interns
        WHERE career IS NOT NULL AND career <> ''
        GROUP BY career
        ORDER BY COUNT(*) DESC
        LIMIT 5
      )
      SELECT 
        COALESCE(
          NULLIF(tc.career, ''),
          'Sin carrera'
        ) as carrera,
        COUNT(i.*)::integer as cantidad
      FROM filtered_interns i
      LEFT JOIN top_careers tc ON i.career = tc.career
      GROUP BY tc.career
      ORDER BY cantidad DESC
    `;

    // Aseguramos que 'Sin carrera' siempre esté presente
    const result: CareerStat[] = rawData;
    if (!result.some((r) => r.carrera === "Sin carrera")) {
      result.push({ carrera: "Sin carrera", cantidad: 0 });
    }

    return {
      data: result,
      total: result.reduce((sum, item) => sum + item.cantidad, 0),
      error: null,
    };
  } catch (error) {
    console.error("Error en getInternsByCareerStats:", error);
    return {
      data: [],
      total: 0,
      error: "Error al obtener estadísticas por carrera",
    };
  }
}
