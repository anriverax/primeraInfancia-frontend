"use client";

import { useParams } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import Link from "next/link";
import { useSchoolDetail } from "@/features/catalogue/schoolDetail/hooks/useSchoolDetail";
import { Info } from "lucide-react";
import SchoolMap from "@/features/catalogue/schoolDetail/components/schoolMap";

const SchoolPage = (): React.JSX.Element => {
  const params = useParams();

  const { schoolDetail } = useSchoolDetail(Number(params.schoolId));

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link href="../centros-escolares">Centros Escolares</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Detalle</BreadcrumbItem>
      </Breadcrumbs>

      <div>
        <div className="grid grid-cols-2 items-center justify-between gap-6">
          <div className="bg-white border-b border-gray-200 mt-6">
            <div className="p-6 flex items-center gap-2 bg-blue-50 text-blue-500">
              <Info className="h-5 w-5" />
              <h3 className="text-2xl font-semibold">{schoolDetail?.name}</h3>
            </div>
            <ul className="p-6 space-y-4">
              <li className="flex items-center gap-2 text-sm">
                <span className="font-medium">Código: </span>
                <span>{schoolDetail?.code}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="font-medium">Ubicación Territorial: </span>
                <span>{`${schoolDetail?.District.Municipality.Department.name} / ${schoolDetail?.District.Municipality.name} / ${schoolDetail?.District.name}`}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="font-medium">Coordenadas: </span>
                <span className="px-2 py-1 rounded-full font-medium bg-blue-50 border-blue-500 border text-blue-700">
                  {schoolDetail?.coordenates}
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="font-medium">Zona: </span>
                <span>{schoolDetail?.zone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="font-medium">Sector: </span>
                <span>{schoolDetail?.sector}</span>
              </li>
            </ul>
          </div>
          {schoolDetail && (
            <div className="flex items-center gap-3">
              <SchoolMap
                coordenates={schoolDetail?.coordenates ?? ""}
                schoolName={schoolDetail?.name ?? ""}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolPage;
