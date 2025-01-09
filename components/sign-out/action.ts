"use server";

import { logout } from "@/lib/auth";

export async function signOut() {
  await logout();
}
