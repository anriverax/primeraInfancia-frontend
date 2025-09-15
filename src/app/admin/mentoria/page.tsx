"use client";
import TrainerView from "@/features/mentoring/trainer/components/trainerView";
import { TypeRole } from "@/shared/constants";
import { useSession } from "next-auth/react";
import { ListTodo } from "lucide-react";

export default function MentoringPage(): React.JSX.Element {
    const { data: session } = useSession();

    return (
        <div className="space-y-8">
            <div className="flex w-full gap-3 justify-between">
                <div className="flex items-center gap-2">
                    <ListTodo className="h-5 w-5 text-blue-500" />
                    <h2 className="text-2xl font-bold text-gray-900">Mentoria</h2>
                </div>
            </div>
            <div className="space-y-4">
                <TrainerView />
            </div>
        </div>
    );
}
