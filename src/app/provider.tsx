"use client"

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type ProviderProps = {
  children: React.ReactNode,
  session: Session | null,
};

export function Provider({children, session}: ProviderProps) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}