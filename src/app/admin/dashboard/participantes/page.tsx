"use client";

import SchoolsByDepartmentChart from "@/features/dashboard/components/participants/school/schoolsByDepartment";
import SchoolsBy from "@/features/dashboard/components/participants/school/schoolsBy";
import { useDashboardParticipant } from "@/features/dashboard/hook/useDashboardParticipant";
import PieChartLayout from "@/features/dashboard/components/pieChartLayout";
import Sex from "@/features/dashboard/components/participants/teacher/sex";
import AgeChart from "@/features/dashboard/components/participants/teacher/birthday";
import CareerTable from "@/features/dashboard/components/participants/career/careerTable";
import { TeacherStatus } from "@/features/dashboard/components/participants/teacher/teacherStatus";

const DashboardParticipantsPage = (): React.JSX.Element => {
  const { schoolFilters } = useDashboardParticipant();

  return (
    <div>
      {schoolFilters && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-12 h-auto">
            <SchoolsBy title="Centros educativos por zonas" data={schoolFilters.zone} />
            <Sex dataSex={schoolFilters.sex} total={schoolFilters.totalTeacher.active} />
            <div className="h-full sm:col-span-2 xl:col-span-1">
              <div className="space-y-6 sm:flex sm:gap-12 sm:space-y-0 lg:justify-between xl:block xl:space-y-6">
                <TeacherStatus
                  num={schoolFilters.totalTeacher.active}
                  title="Cuerpo docente activos"
                  style={{ base: "bg-success/30", text: "text-success-800" }}
                />
                <TeacherStatus
                  num={schoolFilters.totalTeacher.inactive}
                  title="Cuerpo docente inactivos"
                  style={{ base: "bg-danger/30", text: "text-danger-800" }}
                />
              </div>
            </div>
          </div>
          <div className="2xl:flex my-12 gap-12">
            <SchoolsByDepartmentChart data={schoolFilters.department} />
            <div className="2xl:w-[25%] 2xl:mt-0 space-y-3 mt-12">
              <AgeChart data={schoolFilters.ages} />
            </div>
          </div>
          <div className="my-12 2xl:flex 2xl:space-y-0 gap-12 space-y-12">
            <CareerTable title="Nivel académico del cuerpo docente" careerData={schoolFilters.career} />
            <CareerTable
              title="Cuerpo docente por secciones"
              careerData={schoolFilters.educationalLevel}
            />
          </div>
          <div className="my-12 ">
            <PieChartLayout
              data={schoolFilters.experience}
              title="Tiempo de servicio del cuerpo docente"
              height="h-[450px]"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardParticipantsPage;
