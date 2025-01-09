import { Prisma, User } from "@prisma/client";
export type UserType = Omit<User, "password"> & {
  role?: {
    id: number;
    created_at: string;
    name: string;
    display_name: string;
  };
};

export type CreateUser = Prisma.UserCreateInput;
