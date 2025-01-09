import prisma from "@/lib/db";
import { UserForm } from "@/schemas/user";
import bcrypt from "bcrypt";

export async function createUser(data: UserForm) {
  try {
    const role = await prisma.role.findUnique({
      where: {
        name: "USER",
      },
    });

    if (!role) {
      throw new Error("El rol de usuario no fue encontrado");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        cedula: parseInt(data.cedula, 10),
        name: data.name.trim(),
        password: hashedPassword,
        roleId: role.id,
      },
    });

    return {
      ok: true,
      message: "Usuario creado con éxito",
      user,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error al crear usuario:", error.message);
      return {
        ok: false,
        message: error.message,
      };
    }
    console.log("Error desconocido al crear usuario:", error);
    return {
      ok: false,
      message: "Ocurrió un error inesperado al crear el usuario",
    };
  }
}

export async function updateUser(
  id: string | undefined,
  data: Partial<{ name: string; email: string; password: string }>
) {
  try {
    if (!id) throw new Error("El id del usuario es requerido");
    const { password, ...rest } = data;
    const updateData: Partial<{
      name: string;
      email: string;
      password: string;
    }> = {
      ...rest,
    };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: updateData,
    });

    return {
      ok: true,
      message: "Usuario actualizado con éxito",
      user,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error al actualizar usuario:", error.message);
      return {
        ok: false,
        message: error.message,
      };
    }
    console.log("Error desconocido al actualizar usuario:", error);
    return {
      ok: false,
      message: "Ocurrió un error inesperado al actualizar el usuario",
    };
  }
}
