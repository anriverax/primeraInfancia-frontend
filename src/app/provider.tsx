// app/providers.tsx
"use client";

import { TIMEOUT_TOAST } from "@/shared/constants";
import { queryClient } from "@/shared/react-query/reactQueryClient";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToastProvider
            placement="top-right"
            toastOffset={60}
            toastProps={{ timeout: TIMEOUT_TOAST }}
          />
          {children}
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
