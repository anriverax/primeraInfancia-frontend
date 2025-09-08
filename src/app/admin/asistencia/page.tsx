"use client";
import LeaderView from "@/features/attendance/leader/components/leaderView";
import MentorView from "@/features/attendance/mentor/components/mentorView";
import { useSession } from "next-auth/react";

export default function AttendancePage(): React.JSX.Element {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900">📋 Control de Asistencia</h2>
        </div>
      </div>
      {session?.user.role === "USER_FORMADOR" && <LeaderView />}
      {session?.user.role === "USER_MENTOR" && <MentorView />}
    </div>
  );
}
