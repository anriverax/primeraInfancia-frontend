"use client";

import { useParams } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import ListTeachers from "@/features/group/components/detail/listTeachers";
import { useGroupDetail } from "@/features/group/hooks/useGroupDetail";
import GroupDetailInfo from "@/features/group/components/detail/groupDetailInfo";

const GroupDetailPage = (): React.JSX.Element => {
  const params = useParams();

  const { groupDetail } = useGroupDetail(Number(params.groupId));

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem href="../grupos">Grupos</BreadcrumbItem>
        <BreadcrumbItem>Detalle</BreadcrumbItem>
      </Breadcrumbs>

      {/* HEADER - DETAIL */}
      <div className="bg-white border border-gray-200 px-6 py-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Distribución de docentes</h1>
            <p className="text-gray-600">Gestiona los docentes del grupo.</p>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 xl:gap-6">
        <div className="col-span-1 space-y-6">
          {groupDetail && <GroupDetailInfo {...groupDetail} />}
          <div className="bg-white border border-gray-200 mt-6">
            <div className="px-6 pt-6 flex items-center gap-2">
              <h3 className="text-2xl font-semibold">Estadísticas</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {groupDetail?.inscriptionPerson.filter((s) => s.status === "Activo").length}
                </div>
                <div className="text-sm text-green-700 font-medium">Docentes Activos</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">
                  {groupDetail?.inscriptionPerson.filter((s) => s.status === "Inactivo").length}
                </div>
                <div className="text-sm text-yellow-700 font-medium">Docentes Inactivos</div>
              </div>
            </div>
          </div>
        </div>

        {groupDetail && <ListTeachers inscription={groupDetail.inscriptionPerson} />}
      </div>
    </div>
  );
};

export default GroupDetailPage;
