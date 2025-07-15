"use client";

import { useParams } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs, Progress } from "@heroui/react";

import { MapPin, Users } from "lucide-react";
import { useGroupDetail } from "@/features/group/hooks/useGroupDetail";

const GroupDetailPage = (): React.JSX.Element => {
  const params = useParams();

  const { groupDetail } = useGroupDetail(Number(params.groupId));

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Dashboard</BreadcrumbItem>
        <BreadcrumbItem>Grupos</BreadcrumbItem>
        <BreadcrumbItem>Detalle</BreadcrumbItem>
      </Breadcrumbs>

      <div className="bg-white border-b border-gray-200 px-6 py-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Asignación de Integrantes</h1>
            <p className="text-gray-600">Gestiona los integrantes del grupo.</p>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="bg-white border border-blue-100 mt-6">
          <div className="p-6 flex items-center gap-2 bg-blue-50 text-blue-500">
            <Users className="h-5 w-5" />
            <h3 className="text-2xl font-semibold">{groupDetail?.name}</h3>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600">{groupDetail?.description}</p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Zona:</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 border-blue-500 border text-blue-700">
                  {groupDetail?.Zone?.name}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col justify-between text-sm">
                <Progress
                  className="max-w-md"
                  label="Capacidad"
                  maxValue={groupDetail?.memberCount}
                  showValueLabel={true}
                  size="sm"
                  value={groupDetail?._count?.GroupMember}
                  valueLabel={
                    <span>
                      <span>450</span>/<span>{groupDetail?.memberCount}</span>
                    </span>
                  }
                />
                {groupDetail?._count ? (
                  <p className="text-xs text-gray-500">
                    {Math.round((groupDetail?._count?.GroupMember / groupDetail?.memberCount) * 100)}%
                    ocupado
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;
