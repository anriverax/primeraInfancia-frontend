"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDashboardMentoring } from "@/features/dashboard/hook/useDashboardMentoring";
import { useDashboardDetail } from "@/features/dashboard/hook/useDashboardDetail";
import { IAppendix, IGroupCount, IDashboardResume } from "@/features/dashboard/dashboardType";
import PieChartLayout from "@/features/dashboard/components/pieChartLayout";

const DashboardMentoringPage = (): React.JSX.Element => {
  const { mentoringFilters } = useDashboardMentoring();
  const { dashboardDetail } = useDashboardDetail();

  if (!mentoringFilters) return <></>;
  if (!dashboardDetail) return <></>;

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

  return (
    <div>
      <>
        {/* {dashboardDetail.map((appendix: IDashboardResume, index) => ( */}
        <div className="my-6 gap-6 ">
          <div>{dashboardDetail.teacherFemale}</div>
          <div>{dashboardDetail.teacherMale}</div>
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* <div>
                {appendix.answers
                  .filter((a) => a.time === 1)
                  .map((item: any, idx: number) => (
                    <div key={idx} className="mb-4">
                      <PieChartLayout
                        title="Asistencia por mentoría"
                        height="h-[400px]"
                        data={item.labels as IGroupCount[]}
                      />
                    </div>
                  ))}
              </div>
              <div>
                {appendix.answers
                  .filter((a) => a.time === 2)
                  .map((item: any, idx: number) => (
                    <div key={idx} className="mb-4">
                      <PieChartLayout
                        title="Asistencia por mentoría"
                        height="h-[400px]"
                        data={item.labels as IGroupCount[]}
                      />
                    </div>
                  ))}
              </div> */}
          </div>
        </div>
        {/* ))} */}
      </>
    </div>
  );
};

export default DashboardMentoringPage;
