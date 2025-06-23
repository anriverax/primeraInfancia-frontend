// app/providers.tsx
"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <ToastProvider placement="top-right" toastOffset={60} toastProps={{ timeout: 2000 }} />
        {children}
      </HeroUIProvider>
    </SessionProvider>
  );
}
