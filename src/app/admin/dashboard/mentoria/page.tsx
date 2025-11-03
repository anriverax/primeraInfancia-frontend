"use client";

import DataBy from "@/features/dashboard/components/mentoring/detail/cardData";
import EarlyEducation from "@/features/dashboard/components/mentoring/detail/earlyEducation";
import ExtraEducation from "@/features/dashboard/components/mentoring/detail/extraEducation";
import AspectPractice from "@/features/dashboard/components/mentoring/detail/aspectPractice";
import { useDashboardDetail } from "@/features/dashboard/hook/useDashboardDetail";
import AppendixCount from "@/features/dashboard/components/mentoring/detail/appendixCount";

const DashboardMentoringPage = (): React.JSX.Element => {
  // const { mentoringFilters } = useDashboardMentoring();
  const { dashboardDetail } = useDashboardDetail();

  // if (!mentoringFilters) return <></>;
  // return (
  //   <div>
  //     <>
  //       {mentoringFilters.appendix.map((appendix: IAppendix, index) => (
  //         <div className="my-6 gap-6 " key={index}>
  //           <div>{appendix.dimension}</div>
  //           <div className="grid grid-cols-2 gap-12 items-center">
  //             <div>
  //               {appendix.answers
  //                 .filter((a) => a.time === 1)
  //                 .map((item: any, idx: number) => (
  //                   <div key={idx} className="mb-4">
  //                     <PieChartLayout
  //                       title="Asistencia por mentoría"
  //                       height="h-[400px]"
  //                       data={item.labels as IGroupCount[]}
  //                     />
  //                   </div>
  //                 ))}
  //             </div>
  //             <div>
  //               {appendix.answers
  //                 .filter((a) => a.time === 2)
  //                 .map((item: any, idx: number) => (
  //                   <div key={idx} className="mb-4">
  //                     <PieChartLayout
  //                       title="Asistencia por mentoría"
  //                       height="h-[400px]"
  //                       data={item.labels as IGroupCount[]}
  //                     />
  //                   </div>
  //                 ))}
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </>
  //   </div>
  // );

  if (!dashboardDetail) return <></>;
  const teacherGender = [
    { label: "Hombres", count: dashboardDetail.dashboardResume.teacherMale },
    { label: "Mujeres", count: dashboardDetail.dashboardResume.teacherFemale }
  ];
  const teacherShift = [
    { label: "Matutino", count: dashboardDetail.dashboardResume.teacherShiftAm },
    { label: "Vespertino", count: dashboardDetail.dashboardResume.teacherShiftPm }
  ];

  return (
    <div>
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-12 h-auto">
          <DataBy title="Docentes" data={teacherGender} />
          <DataBy title="Turno" data={teacherShift} />
        </div>
        <div className="2xl:flex my-12 gap-12">
          <EarlyEducation data={dashboardDetail.dashboardResume.earlyEducation} />
        </div>
        <div className="2xl:flex my-12 gap-12">
          <ExtraEducation data={dashboardDetail.dashboardResume.extraEducation} />
        </div>
        <div className="2xl:flex my-12 gap-12">
          <AppendixCount data={dashboardDetail.appendixAnswerCount} />
        </div>
        <div className="2xl:flex my-12 gap-12">
          <AspectPractice data={dashboardDetail.aspectPracticeCount} />
        </div>
      </>
    </div>
  );
};

export default DashboardMentoringPage;
