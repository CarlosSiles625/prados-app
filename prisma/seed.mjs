import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Verificar y crear roles si no existen
  const [adminRole, userRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: "ADMIN" },
      update: {},
      create: {
        name: "ADMIN",
        display_name: "Administrador",
      },
    }),
    prisma.role.upsert({
      where: { name: "USER" },
      update: {},
      create: {
        name: "USER",
        display_name: "Usuario General",
      },
    }),
  ]);

  console.log("Roles seeded:", { adminRole, userRole });

  // Verificar si ya existe el usuario administrador
  const adminExists = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (!adminExists) {
    // Crear contraseña encriptada
    const passwordHash = await bcrypt.hash("default_password", 10);

    // Crear cuenta de administrador
    const adminUser = await prisma.user.create({
      data: {
        name: "Admin",
        cedula: 12345678,
        email: "admin@example.com",
        password: passwordHash,
        role: {
          connect: { id: adminRole.id },
        },
      },
    });

    console.log("Admin user created:", adminUser);
  } else {
    console.log("Admin user already exists. Skipping creation.");
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
