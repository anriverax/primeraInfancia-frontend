"use client";

import { useParams } from "next/navigation";
import SchoolDetailLayout from "@/features/schools/school/component/schoolDetailLayout";
import { BreadcrumbItem, Breadcrumbs, Progress } from "@heroui/react";
import { useSchoolDetail } from "@/features/schools/hooks/school/useSchoolDetail";
import { Map, ShieldUser } from "lucide-react";

const SchoolDetailPage = (): React.JSX.Element => {
  const params = useParams();

  const { schoolDetail } = useSchoolDetail(Number(params.schoolId));
  console.log(schoolDetail?.PrincipalSchool?.firstName, "---");
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Dashboard</BreadcrumbItem>
        <BreadcrumbItem>Centro Escolar</BreadcrumbItem>
        <BreadcrumbItem>Detalle</BreadcrumbItem>
      </Breadcrumbs>

      <div className="bg-white border-b border-gray-200 px-6 py-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Información detallada con relación al centro escolar</h1>
            <p className="text-gray-600">Ubicación, número de contacto y nombre del director.</p>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
      </div>
      <div className="mt-6">   <SchoolDetailLayout /></div>


      <div className="flex gap-6 mt-6 mb-6">
        {/* Director Card */}
        <div className="bg-white border border-blue-100 p-6 flex-1 max-w-xs">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-500 mb-4">
            <ShieldUser className="h-5 w-5" />
            <h3 className="text-2xl font-semibold">Director</h3>
          </div>
          <div>
            <span className="text-gray-600">{schoolDetail?.PrincipalSchool?.firstName} - Nombre</span>
            {/* Add more director info as needed */}
          </div>
        </div>
        {/* Ubicación Card */}
        <div className="bg-white border border-blue-100 p-6" style={{ width: "80%" }}>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-500 mb-4">
            <Map className="h-5 w-5" />
            <h3 className="text-2xl font-semibold">Ubicación</h3>
          </div>
          <div>
            <span className="text-gray-600">{schoolDetail?.coordenates}</span>
            {/* Add more location info as needed */}
          </div>
        </div>
      </div>


    </div >
  );
};

export default SchoolDetailPage;
