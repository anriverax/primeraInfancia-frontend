"use client";
import LeaderView from "@/features/attendance/leader/components/leaderView";
import { useSession } from "next-auth/react";

export default function AttendancePage() {
  const { data: session } = useSession();

  return <>{session?.user.role === "USER_FORMADOR" && <LeaderView />}</>;
}
