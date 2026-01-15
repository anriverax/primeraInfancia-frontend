"use client";

import { useFormStatusToast } from "@/shared/hooks/ui/useFormStatusToast";

export function AuthToastProvider() {
  useFormStatusToast();
  return null; // Only side effects
}
