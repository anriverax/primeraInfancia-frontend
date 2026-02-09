"use client";

import DepartmentSummary from "@/components/modules/dashboard/mapBox/departmentSummary";
import { useMapbox } from "@/components/modules/dashboard/mapBox/hook/useMapbox";
import { MapLegend } from "@/components/modules/dashboard/mapBox/mapLegend";
import TopDepartment from "@/components/modules/dashboard/mapBox/topDeparment";
import LoadingSkeleton from "@/components/ui/common/loadingSkeleton";
import { useCallback } from "react";
import MapboxReal from "../../../../components/modules/dashboard/mapBox/mapboxReal";
import { KPI } from "@/components/modules/dashboard/mapBox/kpi";

export default function DashboardPage(): React.JSX.Element {
  const { schoolList, filtered, globalStats, isLoading, setSelectedDepto } = useMapbox();
  /* eslint-disable react-hooks/exhaustive-deps */
  const memoizedSetDepto = useCallback(setSelectedDepto, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {schoolList.length > 0 && globalStats && <KPI nums={globalStats} />}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 p-4 bg-white shadow-md h-[520px] overflow-y-auto rounded-2xl">
          {filtered.length > 0 && (
            <TopDepartment filtered={filtered} setSelectedDepto={memoizedSetDepto} />
          )}
        </div>
        <div className="col-span-9 relative h-[520px] overflow-hidden">
          <DepartmentSummary stats={globalStats!} filteredLength={filtered.length} />
          {filtered.length > 0 && <MapboxReal filtered={filtered} setSelectedDepto={memoizedSetDepto} />}
          <MapLegend />
        </div>
      </div>
    </>
  );
}

/*filtered.map((e, i) => {
          const coords = e.coordenates.split(",").map((c) => parseFloat(c.trim()));
          return (
            <div
              key={e.id}
              style={{
                padding: 10,
                borderRadius: 8,
                marginBottom: 6,
                cursor: "pointer",
                background: "#f9fafb"
              }}
              onClick={() =>
                setPopup({
                  lng: coords[0],
                  lat: coords[1],
                  name: e.name
                })
              }
            >
              <strong>{e.name}</strong>
              <div style={{ fontSize: 12, opacity: 0.6 }}>{e.Department?.name}</div>
            </div>
          );
        })*/
