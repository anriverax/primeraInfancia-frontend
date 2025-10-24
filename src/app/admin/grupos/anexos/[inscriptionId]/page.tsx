"use client";

import TrainerView from "@/features/mentoring/component/trainerView";
import { ListTodo } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import DetailAppendixTable from "@/features/group/components/appendix/table";
import { useSelectedRowsStore } from "@/shared/hooks/store/useSelectedRowsStore";

export default function MentoringPage(): React.JSX.Element {
  const params = useParams();
  const search = useSearchParams();

  // route param (string) -> number
  //const inscriptionId = params?.inscriptionId ? Number(params.inscriptionId) : undefined;

  // single query param
  const fullName = search.get("fullName") ?? "";
  const idInscription = search.get("inscripcionId") ?? "";

  // query param that may contain comma-separated ids: "5159,5160"
  // const inscriptionIds = (search.get("inscriptionId") ?? "")
  //   .split(",")
  //   .map((s) => Number(s))
  //   .filter((n) => !Number.isNaN(n));

  // example navigation (encode query values)
  // const openWithQuery = (id: number, name?: string) => {
  //   const q = new URLSearchParams();
  //   q.set("fullName", name ?? "");
  //   router.push(`/admin/grupos/anexos/${id}?${q.toString()}`);
  // };

  // try to get fullName from query param `fullName`
  const selectedRows = useSelectedRowsStore((s) => s.selectedRows);
  const selectedFullName = selectedRows?.[0]?.fullName ?? fullName;

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="flex items-center gap-2">
          <ListTodo className="h-5 w-5 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Mentoria</h2>
        </div>
      </div>

      {/* show teacher full name when available */}
      {selectedFullName && (
        <div className="px-4">
          <h3 className="text-lg font-medium text-gray-800">Docente: {fullName}</h3>
        </div>
      )}

      <div className="space-y-4">
        <DetailAppendixTable id={Number(params.inscriptionId)} />
        <TrainerView inscriptionId={Number(idInscription)} />
      </div>
    </div>
  );
}
