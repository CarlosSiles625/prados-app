import { PrismaClient } from "@prisma/client";
const FAKE_INTERNS = [
  {
    created_at: "2025-01-01T12:00:00.000Z",
    name: "Carlos Pérez",
    birthdate: "1990-07-15T00:00:00.000Z",
    born_place: {
      departamento: "Chuquisaca",
      ciudad: "Sucre",
    },
    isRural: false,
    cedula: 12345678,
    phone: "555-123-4567",
    references: [
      {
        name: "Luis Sánchez",
        phone: "555-987-6543",
        relationship: "Hermano",
      },
    ],
    marital_status: "Soltero",
    direction: {
      street: "Av. Principal 123",
      zone: "Centro",
      city: "Lima",
    },
    adiccions: [
      {
        name: "Alcohol",
        consumption_time: "5 años",
      },
    ],
    education: {
      primary: true,
      secondary: true,
      university: false,
    },
    profession: "Electricista",
    ocupation: "Técnico",
    talents: ["Carpintería", "Mecánica"],
    guarantor_name: "Rosa Martínez",
    image: null,
    user_id: "cm5vt8cve0000bumcoympom69",
    interned_at: "2025-01-05T10:00:00.000Z",
    out_at: null,
    status: "Activo",
    finished_program: false,
    out_properties: null,
    gender: "M",
  },
  {
    created_at: "2025-01-02T14:30:00.000Z",
    name: "María López",
    birthdate: "1985-03-22T00:00:00.000Z",
    born_place: {
      departamento: "La Paz",
      ciudad: "Jaén",
    },
    isRural: true,
    cedula: 872654321,
    phone: "555-654-3210",
    references: [
      {
        name: "Ana Torres",
        phone: "555-321-9870",
        relationship: "Amiga",
      },
      {
        name: "Juan López",
        phone: "555-789-0123",
        relationship: "Hermano",
      },
    ],
    marital_status: "Casada",
    direction: {
      street: "Calle Los Olivos 45",
      zone: "Sur",
      city: "Jaén",
    },
    adiccions: [
      {
        name: "Tabaco",
        consumption_time: "10 años",
      },
    ],
    education: {
      primary: true,
      secondary: true,
      university: true,
    },
    profession: "Contadora",
    ocupation: "Administradora",
    talents: ["Pintura", "Cocina"],
    guarantor_name: "José Fernández",
    image: null,
    user_id: "cm5vt8cve0000bumcoympom69",
    interned_at: "2025-01-10T09:30:00.000Z",
    out_at: "2025-01-20T17:00:00.000Z",
    status: "Inactivo",
    finished_program: true,

    out_properties: {
      reason: "Alta voluntaria",
      observations: "Paciente completó el programa satisfactoriamente.",
    },
    gender: "F",
  },
  {
    created_at: "2024-12-01T08:45:00.000Z",
    name: "Pedro Alvarado",
    birthdate: "1975-11-20T00:00:00.000Z",
    born_place: {
      departamento: "Oruro",
      ciudad: "Urubamba",
    },
    isRural: true,
    cedula: 5434422,
    phone: "555-998-7766",
    references: [
      {
        name: "Sonia Quispe",
        phone: "555-887-7765",
        relationship: "Esposa",
      },
    ],
    marital_status: "Casado",
    direction: {
      street: "Calle Puno 12",
      zone: "Norte",
      city: "Urubamba",
    },
    adiccions: [
      {
        name: "Alcohol",
        consumption_time: "15 años",
      },
      {
        name: "Tabaco",
        consumption_time: "8 años",
      },
    ],
    education: {
      primary: true,
      secondary: false,
      university: false,
    },
    profession: "Agricultor",
    ocupation: "Campesino",
    talents: ["Cuidado de animales", "Carpintería"],
    guarantor_name: "Miguel Alvarado",
    image: null,
    user_id: "cm5vt8cve0000bumcoympom69",
    interned_at: "2024-12-15T10:00:00.000Z",
    out_at: null,
    status: "Activo",
    finished_program: false,
    out_properties: null,
    gender: "M",
  },
  {
    created_at: "2023-06-15T11:30:00.000Z",
    name: "Ana Rojas",
    birthdate: "1995-05-12T00:00:00.000Z",
    born_place: {
      departamento: "Santa Cruz",
      ciudad: "Santa Cruz",
    },
    isRural: false,
    cedula: 9765432,
    phone: "555-101-1122",
    references: [
      {
        name: "Carlos Rojas",
        phone: "555-202-2233",
        relationship: "Hermano",
      },
    ],
    marital_status: "Soltera",
    direction: {
      street: "Av. Los Pinos 45",
      zone: "Este",
      city: "Arequipa",
    },
    adiccions: [
      {
        name: "Videojuegos",
        consumption_time: "5 años",
      },
    ],
    education: {
      primary: true,
      secondary: true,
      university: true,
    },
    profession: "Ingeniera",
    ocupation: "Desarrolladora",
    talents: ["Dibujo digital", "Programación"],
    guarantor_name: null,
    image: null,
    user_id: "cm5vt8cve0000bumcoympom69",
    interned_at: "2023-06-20T09:00:00.000Z",
    out_at: "2023-08-01T14:00:00.000Z",
    status: "Inactivo",
    finished_program: true,
    out_properties: {
      reason: "Finalización exitosa",
      observations: "Alta recomendada tras cumplir objetivos.",
    },
    gender: "F",
  },
  {
    created_at: "2024-03-10T13:15:00.000Z",
    name: "Jorge Hidalgo",
    birthdate: "1982-08-10T00:00:00.000Z",
    born_place: {
      departamento: "Chuquisaca",
      ciudad: "Juliaca",
    },
    isRural: true,
    cedula: 6473829,
    phone: "555-555-1234",
    references: [
      {
        name: "Luz Hidalgo",
        phone: "555-444-5678",
        relationship: "Esposa",
      },
    ],
    marital_status: "Casado",
    direction: {
      street: "Jr. Comercio 23",
      zone: "Oeste",
      city: "Juliaca",
    },
    adiccions: [],
    education: {
      primary: true,
      secondary: true,
      university: false,
    },
    profession: "Chofer",
    ocupation: "Transportista",
    talents: ["Reparación de vehículos", "Oratoria"],
    guarantor_name: "Roberto Hidalgo",
    image: null,
    user_id: "cm5vt8cve0000bumcoympom69",
    interned_at: "2024-03-15T08:00:00.000Z",
    out_at: null,
    status: "Activo",
    finished_program: false,
    out_properties: null,
    gender: "M",
  },
  {
    id: "clx2a3b4c56e0",
    created_at: "2022-11-20T16:00:00.000Z",
    name: "Lucía Fernández",
    birthdate: "2001-01-25T00:00:00.000Z",
    born_place: {
      departamento: "Tarija",
      ciudad: "Tarija",
    },
    isRural: false,
    cedula: 3456789,
    phone: "555-789-4561",
    references: [
      {
        name: "Julio Fernández",
        phone: "555-987-6541",
        relationship: "Padre",
      },
    ],
    marital_status: "Soltera",
    direction: {
      street: "Pasaje Los Olivos 14",
      zone: "Sur",
      city: "Trujillo",
    },
    adiccions: [
      {
        name: "Redes Sociales",
        consumption_time: "2 años",
      },
    ],
    education: {
      primary: true,
      secondary: true,
      university: false,
    },
    profession: null,
    ocupation: null,
    talents: ["Canto", "Danza"],
    guarantor_name: "María Fernández",
    image: null,
    user_id: "cm5vt8cve0000bumcoympom69",
    interned_at: "2022-11-25T12:00:00.000Z",
    out_at: "2023-01-10T16:00:00.000Z",
    status: "Inactivo",
    finished_program: true,
    out_properties: {
      reason: "Alta médica",
      observations: "Recomendación de seguimiento externo.",
    },
    gender: "F",
  },
  {
    created_at: "2023-07-20T10:15:00.000Z",
    name: "Luis Pérez",
    birthdate: "1990-03-18T00:00:00.000Z",
    born_place: {
      departamento: "La Paz",
      ciudad: "El Alto",
    },
    isRural: true,
    cedula: 12745678,
    phone: "555-303-3344",
    references: [
      {
        name: "María Pérez",
        phone: "555-404-4455",
        relationship: "Hermana",
      },
    ],
    marital_status: "Casado",
    direction: {
      street: "Calle Murillo 123",
      zone: "Central",
      city: "La Paz",
    },
    adiccions: [
      {
        name: "Café",
        consumption_time: "10 años",
      },
    ],
    education: {
      primary: true,
      secondary: true,
      university: false,
    },
    profession: "Carpintero",
    ocupation: "Artesano",
    talents: ["Tallado en madera", "Diseño artesanal"],
    guarantor_name: null,
    image: null,
    user_id: "cm5vt8cve0000bumcoympom69",
    interned_at: "2023-08-01T09:30:00.000Z",
    out_at: "2023-09-15T17:00:00.000Z",
    status: "Alta",
    finished_program: true,
    out_properties: {
      reason: "Reintegración satisfactoria",
      observations: "Compromiso demostrado durante el programa.",
    },
    gender: "M",
  },
  {
    created_at: "2023-05-10T14:25:00.000Z",
    name: "Juana Flores",
    birthdate: "1988-09-25T00:00:00.000Z",
    born_place: {
      departamento: "Cochabamba",
      ciudad: "Sacaba",
    },
    isRural: false,
    cedula: 77654321,
    phone: "555-505-5566",
    references: [
      {
        name: "Miguel Flores",
        phone: "555-606-6677",
        relationship: "Padre",
      },
    ],
    marital_status: "Soltera",
    direction: {
      street: "Av. Libertador 789",
      zone: "Sur",
      city: "Cochabamba",
    },
    adiccions: [
      {
        name: "Redes Sociales",
        consumption_time: "7 años",
      },
    ],
    education: {
      primary: true,
      secondary: true,
      university: true,
    },
    profession: "Médica",
    ocupation: "Geriatra",
    talents: ["Canto", "Organización comunitaria"],
    guarantor_name: null,
    image: null,
    user_id: "cm5vt8cve0000bumcoympom69",
    interned_at: "2023-06-01T10:45:00.000Z",
    out_at: null,
    status: "Activo",
    finished_program: false,
    out_properties: null,
    gender: "F",
  },
  {
    id: "clx2a3b4c56e3",
    created_at: "2023-04-18T12:40:00.000Z",
    name: "Marco Villa",
    birthdate: "1992-11-10T00:00:00.000Z",
    born_place: {
      departamento: "Tarija",
      ciudad: "Yacuiba",
    },
    isRural: true,
    cedula: 6543448,
    phone: "555-707-7788",
    references: [
      {
        name: "Rosa Villa",
        phone: "555-808-8899",
        relationship: "Esposa",
      },
    ],
    marital_status: "Casado",
    direction: {
      street: "Calle Tarija 567",
      zone: "Oeste",
      city: "Yacuiba",
    },
    adiccions: [
      {
        name: "Televisión",
        consumption_time: "15 años",
      },
    ],
    education: {
      primary: true,
      secondary: true,
      university: false,
    },
    profession: "Agricultor",
    ocupation: "Productor de maíz",
    talents: ["Cuidado de cultivos", "Mantenimiento de maquinaria"],
    guarantor_name: "Carlos Mendoza",
    image: null,
    user_id: "cm5vt8cve0000bumcoympom69",
    interned_at: "2023-05-01T08:15:00.000Z",
    out_at: "2023-06-30T16:45:00.000Z",
    status: "Baja",
    finished_program: false,
    out_properties: {
      reason: "Incumplimiento de normas",
      observations: "Requiere más orientación personal.",
    },
    gender: "M",
  },
];

async function main() {
  try {
    console.log("Creating fake interns...");
    const prisma = new PrismaClient();
    const resp = await prisma.intern.createMany({
      data: FAKE_INTERNS,
    });
    console.log("Fake interns created:", resp);
  } catch (error) {
    console.log("Error creating fake interns:", error);
  }
}

main().finally(async () => {
  const prisma = new PrismaClient();
  await prisma.$disconnect();
});
