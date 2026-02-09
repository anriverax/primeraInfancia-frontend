"use client";

import { useFormStatusToast } from "@/shared/hooks/ui/useFormStatusToast";

/**
 * Provider component that manages toast notifications for authentication form status.
 * @returns Null component (side-effects only).
 */
export function AuthToastProvider(): null {
  useFormStatusToast();
  return null; // Only side effects
}
