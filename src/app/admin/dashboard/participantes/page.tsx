"use client";

import SchoolsByDepartmentChart from "@/features/dashboard/components/school/schoolsByDepartment";
import SchoolsBy from "@/features/dashboard/components/school/schoolsBy";
import { useDashboardParticipant } from "@/features/dashboard/hook/useDashboardParticipant";
import TotalData from "@/features/dashboard/components/totalData";
import CareerTable from "@/features/dashboard/components/career/careerTable";
import AgeChart from "@/features/dashboard/components/teacher/birthday";
import Sex from "@/features/dashboard/components/teacher/sex";
import { Nip } from "@/features/dashboard/components/teacher/nip";

const DashboardPage = (): React.JSX.Element => {
  const { schoolFilters } = useDashboardParticipant();

  return (
    <div>
      {schoolFilters && (
        <>
          <div className="grid grid-cols-4 gap-6 h-auto">
            <SchoolsBy title="Centros Escolares - Zonas" data={schoolFilters.zone} />
            <Sex dataSex={schoolFilters.sex} total={schoolFilters.total.teacher} />
            <TotalData
              totalSchool={schoolFilters.total.school}
              totalTeacher={schoolFilters.total.teacher}
            />
          </div>
          <div className="flex my-6 gap-6">
            <SchoolsByDepartmentChart data={schoolFilters.department} />
            <div className="w-[25%] space-y-3">
              <Nip nip={schoolFilters.nip} />
              <AgeChart data={schoolFilters.ages} />
            </div>
          </div>
          <div className="my-6">
            <CareerTable careerData={schoolFilters.career} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
