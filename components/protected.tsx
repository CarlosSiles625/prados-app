import { SessionProvider } from "@/context/session-context";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function Protected({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
