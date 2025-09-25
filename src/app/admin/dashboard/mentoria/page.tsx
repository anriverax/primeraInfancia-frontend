"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDashboardMentoring } from "@/features/dashboard/hook/useDashboardMentoring";
import { IAppendix8, IGroupCount } from "@/features/dashboard/dashboardType";
import PieChartLayout from "@/features/dashboard/components/pieChartLayout";

const DashboardMentoringPage = (): React.JSX.Element => {
  const { mentoringFilters } = useDashboardMentoring();

  if (!mentoringFilters) return <></>;

  return (
    <div>
      <>
        {mentoringFilters.appendix8.map((appendix8: IAppendix8, index) => (
          <div className="my-6 gap-6 " key={index}>
            <div>{appendix8.dimension}</div>
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                {appendix8.answers
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
                {appendix8.answers
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
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default DashboardMentoringPage;
