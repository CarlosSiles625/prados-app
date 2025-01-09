"use client";
import { UserType } from "@/types/user";
import { createContext, useContext } from "react";

type SessionType = {
  user: UserType;
  expires: string;
};

const SessionContext = createContext<SessionType | null>(null);

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionType;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
