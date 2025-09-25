"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDashboardAttendance } from "@/features/dashboard/hook/useDashboardAttendance";
import CardLayoutDashboard from "@/features/dashboard/components/cardLayoutDashboard";
import { cn } from "@/shared/utils/tv";
import { UsersRound } from "lucide-react";
import { Tab, Tabs } from "@heroui/react";
import { AttendanceEnum } from "@/shared/constants";
import { useState } from "react";
import PieChartLayout from "@/features/dashboard/components/pieChartLayout";
import AttendanceChart from '@/features/dashboard/components/attendance/events/attendance';

const DashboardAttendancePage = (): React.JSX.Element => {
  const [selected, setSelected] = useState<AttendanceEnum>(AttendanceEnum.PRESENTE);
  const { attendanceFilters } = useDashboardAttendance(selected);

  if (!attendanceFilters) return <></>;

  return (
    <div>
      <>
        {attendanceFilters.eventType.length > 0 && (
          <>
            <div className="my-6 flex justify-between items-center gap-6">
              <div>
                <p className="font-medium">Filtros</p>
              </div>
              <div>
                <div className="flex flex-wrap gap-4">
                  <Tabs
                    aria-label="Tabs colors"
                    radius="full"
                    size="sm"
                    color="primary"
                    classNames={{ tabList: "bg-white shadow-sm" }}
                    selectedKey={selected}
                    onSelectionChange={(key) => setSelected(key as AttendanceEnum)}
                  >
                    {Object.values(AttendanceEnum).map((value) => (
                      <Tab key={value} title={value} />
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="flex my-6 gap-6">
              <AttendanceChart data={attendanceFilters.eventType} />
              <div className="w-[25%]">
                <PieChartLayout
                  title="Asistencia por mentoría"
                  height="h-[400px]"
                  data={attendanceFilters.mentoring}
                />
              </div>
            </div>
          </>
        )}
        <div className="my-6">
          <CardLayoutDashboard title="Cantidad de eventos">
            <div className="grid grid-cols-4 gap-6">
              {attendanceFilters.events.map((item, index) => (
                <div className="px-6" key={index}>
                  <div key={index} className="flex gap-3 items-center">
                    <div>
                      <div
                        className={cn("p-2 rounded-lg shrink-0", {
                          "bg-success-100": index === 0,
                          "bg-warning-100": index === 1,
                          "bg-primary-100": index === 2,
                          "bg-secondary-100": index === 3
                        })}
                      >
                        <UsersRound
                          className={cn("w-5 h-5 text-white", {
                            "text-success-500": index === 0,
                            "text-warning-500": index === 1,
                            "text-primary-500": index === 2,
                            "text-secondary-500": index === 3
                          })}
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium">{item.name}</span>
                      <p className="font-bold text-2xl">{item.totalEvents}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardLayoutDashboard>
        </div>
      </>
    </div>
  );
};

export default DashboardAttendancePage;
