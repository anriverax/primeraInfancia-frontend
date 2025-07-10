// app/providers.tsx
"use client";

import { queryClient } from "@/shared/utils/reactQueryClient";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToastProvider placement="top-right" toastOffset={60} toastProps={{ timeout: 2000 }} />
          {children}
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
