"use client";
import { useParams } from "next/navigation";
import { ShieldPlus } from "lucide-react";
import BulkGradeView from "@/features/grade/components/bulkGrade";

const BulkPage = (): Promise<React.JSX.Element> => {
  const params = useParams();

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="flex items-center gap-2">
          <ShieldPlus className="h-5 w-5 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Ingreso de calificaciones</h2>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Procesamiento por lotes</h2>
        </div>
        <BulkGradeView groupId={Number(params.groupId)} />
      </div>
    </div>
  );
};

export default BulkPage;
