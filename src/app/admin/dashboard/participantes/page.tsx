"use client";

import SchoolsByDepartmentChart from "@/features/dashboard/components/participants/school/schoolsByDepartment";
import SchoolsBy from "@/features/dashboard/components/participants/school/schoolsBy";
import { useDashboardParticipant } from "@/features/dashboard/hook/useDashboardParticipant";
import TotalData from "@/features/dashboard/components/totalData";

import PieChartLayout from "@/features/dashboard/components/pieChartLayout";
import Sex from '@/features/dashboard/components/participants/teacher/sex';
import AgeChart from '@/features/dashboard/components/participants/teacher/birthday';
import { Nip } from '@/features/dashboard/components/participants/teacher/nip';
import CareerTable from '@/features/dashboard/components/participants/career/careerTable';
import { TeacherStatus } from '@/features/dashboard/components/participants/teacher/teacherStatus';

const DashboardParticipantsPage = (): React.JSX.Element => {
  const { schoolFilters } = useDashboardParticipant();

  return (
    <div>
      {schoolFilters && (
        <>
          <div className="grid grid-cols-4 gap-12 h-auto">
            <SchoolsBy title="Centros Escolares por zonas" data={schoolFilters.zone} />
            <Sex dataSex={schoolFilters.sex} total={schoolFilters.total.teacher.active} />
            <TotalData
              totalSchool={schoolFilters.total.school}
              totalTeacher={schoolFilters.total.teacher.active + schoolFilters.total.teacher.inactive}
            />
            <div className="space-y-6 h-full">
              <TeacherStatus
                num={schoolFilters.total.teacher.active}
                title="Docentes Activos"
                style={{ base: "bg-success/30", text: "text-success-800" }}
              />
              <TeacherStatus
                num={schoolFilters.total.teacher.inactive}
                title="Docentes Inactivos"
                style={{ base: "bg-danger/30", text: "text-danger-800" }}
              />
            </div>
          </div>
          <div className="flex my-12 gap-12">
            <SchoolsByDepartmentChart data={schoolFilters.department} />
            <div className="w-[25%] space-y-3">
              <Nip nip={schoolFilters.nip} />
              <AgeChart data={schoolFilters.ages} />
            </div>
          </div>
          <div className="my-12 flex gap-12">
            <CareerTable title="Nivel académico de los docentes" careerData={schoolFilters.career} />
            <CareerTable
              title="Nivel educativo en el que imparte clases el docente"
              careerData={schoolFilters.educationalLevel}
            />
          </div>
          <div className="my-12 ">
            <PieChartLayout
              data={schoolFilters.experience}
              title="Tiempo de servicio del docente"
              height="h-[450px]"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardParticipantsPage;
