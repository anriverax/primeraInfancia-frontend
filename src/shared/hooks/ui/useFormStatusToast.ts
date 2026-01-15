"use client";

import { useEffect, useCallback } from "react";
import { addToast } from "@heroui/react";
import { useProfileFormStatus, useUpdatedProfileStore } from "../../store/useUpdatedProfileStore";

/**
 * Custom hook for managing form status toast notifications
 *
 * Handles:
 * - Displaying success notifications from form submissions
 * - Auto-resetting form status after notification
 * - Proper cleanup of timers
 *
 * @returns void
 *
 * @example
 * const MyComponent = () => {
 *   useFormStatusToast();
 *   return <div>My form component</div>;
 * };
 */

const TOAST_RESET_DELAY = 1500; // 1.5 segundos para que el usuario vea el toast

export const useFormStatusToast = (): void => {
  const formStatus = useProfileFormStatus();
  const { setFormStatus } = useUpdatedProfileStore.getState();

  // Memoized toast handler to prevent unnecessary function recreations
  // Dependencies: only formStatus.msg changes trigger new function
  const displaySuccessToast = useCallback(() => {
    addToast({
      title: "",
      severity: "success",
      variant: "bordered",
      classNames: {
        icon: "w-6 h-6 fill-current text-green-500"
      }
    });
  }, []);

  // Effect to handle form status notifications
  // Flow:
  // 1. Check if formStatus.isOk is true (form action succeeded)
  // 2. Display toast notification
  // 3. Schedule reset of formStatus after 100ms
  // 4. Cleanup timer on unmount or when dependency changes
  useEffect(() => {
    // Early return if form status is not "ok"
    if (!formStatus.isOk) return;

    // Display the success notification
    displaySuccessToast();

    // Reset the form status after a short delay
    // This prevents duplicate notifications on re-renders
    const resetTimer = setTimeout(() => {
      setFormStatus({ isOk: false, msg: "" });
    }, TOAST_RESET_DELAY);

    // Cleanup function: clear timeout if component unmounts or deps change
    return () => {
      clearTimeout(resetTimer);
    };
    // Dependencies:
    // - formStatus.isOk: when form status changes, rerun effect
    // - displaySuccessToast: when memo function changes, rerun effect
    // - setFormStatus: when setter changes (unlikely, but prevents stale closure)
  }, [formStatus.isOk, setFormStatus]);
};
