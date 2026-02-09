import { useEffect, useMemo, useState } from "react";
import { GlobalStat, SchoolList } from "../../dashboard.type";
import { useApiQuery } from "@/shared/hooks/http/useApiQuery";

interface MapboxReturn {
  schoolList: SchoolList[];
  filtered: SchoolList[];
  globalStats: GlobalStat | undefined;
  isLoading: boolean;
  selectedDepto: string | null;
  setSelectedDepto: React.Dispatch<React.SetStateAction<string | null>>;
}

const useMapbox = (): MapboxReturn => {
  const [selectedDepto, setSelectedDepto] = useState<string | null>(null);
  const [filtered, setFiltered] = useState<SchoolList[]>([]);

  const { data: schoolList, isLoading } = useApiQuery<SchoolList[] | []>({
    key: "dashboard-school-list",
    endpoint: "/dashboard/schools",
    enabled: true,
    description: "dashboard schools list"
  });

  const globalStats = useMemo((): GlobalStat | undefined => {
    if (schoolList) {
      const total = schoolList.length;

      const rural = schoolList.filter((s) => s.zone === "Rural").length;
      const urbano = schoolList.filter((s) => s.zone === "Urbana").length;
      const teachersCount = schoolList.reduce((acc, s) => acc + s.teachersCount, 0);

      return {
        total,
        teachersCount,
        ruralPct: Math.round((rural / total) * 100),
        urbanoPct: Math.round((urbano / total) * 100)
      };
    }
  }, [schoolList]);

  useEffect(() => {
    if (!schoolList) return;

    if (!selectedDepto) {
      setFiltered(schoolList);
    } else {
      const target = selectedDepto.toLowerCase().trim();

      setFiltered(schoolList.filter((e) => e.departmentName.toLowerCase().trim() === target));
    }
  }, [selectedDepto, schoolList]);

  return { schoolList, filtered, globalStats, isLoading, selectedDepto, setSelectedDepto };
};

export { useMapbox };
