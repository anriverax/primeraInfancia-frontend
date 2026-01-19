"use client";

import { useParams } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import Link from "next/link";
import { Info } from "lucide-react";
import SchoolMap from "@/features/catalogue/school/components/detail/schoolMap";
import TeacherTable from "@/features/catalogue/school/components/detail/table/teacherTable";
import { ISchoolDetail } from "@/features/catalogue/school/schoolType";
import CustomProgress from "@/shared/ui/customProgress";
import { useListApiQuery } from "@/shared/react-query/hook/useListApiQuery";

const SchoolPage = (): React.JSX.Element => {
  const params = useParams();

  const { data: schoolDetail } = useListApiQuery<ISchoolDetail>({
    key: `school-detail-${params.schoolId}`,
    endpoint: `/catalogue/school/${params.schoolId}`,
    enabled: true,
    description: "centro escolar"
  });

  const schoolContent = (data: ISchoolDetail): React.JSX.Element => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 items-center justify-between gap-6">
        <div className="bg-white border-b border-gray-200 mt-6 rounded-[14px] shadow">
          <div className="p-6 flex items-center gap-2 bg-blue-50 text-blue-500 rounded-t-xl">
            <Info className="h-5 w-5" />
            <h3 className="text-lg xl:text-2xl font-semibold">{data.name}</h3>
          </div>
          <ul className="p-6 space-y-4">
            <li className="flex items-center gap-2 text-sm">
              <span className="font-medium">Código: </span>
              <span>{data.code}</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="font-medium">Ubicación Territorial: </span>
              <span>{`${data.District.Municipality.Department.name} / ${data.District.Municipality.name} / ${data.District.name}`}</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="font-medium">Coordenadas: </span>
              <span className="px-2 py-1 rounded-full font-medium bg-blue-50 border-blue-500 border text-blue-700">
                {data.coordenates}
              </span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="font-medium">Zona: </span>
              <span>{data.zone}</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="font-medium">Sector: </span>
              <span>{data.sector}</span>
            </li>
          </ul>
        </div>
        {schoolDetail && (
          <div className="flex items-center gap-3">
            <SchoolMap coordenates={data.coordenates ?? ""} schoolName={data.name ?? ""} />
          </div>
        )}
      </div>

      <TeacherTable teacherData={data.teachers} />
    </div>
  );

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link href="../centros-educativos">Centros Escolares</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Detalle</BreadcrumbItem>
      </Breadcrumbs>
      {schoolDetail ? schoolContent(schoolDetail) : <CustomProgress />}
    </div>
  );
};

export default SchoolPage;
