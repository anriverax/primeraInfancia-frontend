import useAxios from "@/shared/hooks/useAxios";
import { handleAxiosError } from "@/shared/utils/funtions";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IMentorAssignmentByUser } from "../attendance.type";

const useMentor = (): {
  mentorAssignment: IMentorAssignmentByUser;
  calculateDistance: (_schoolDist: string, _mentorDist: string) => number;
} => {
  const useRequest = useAxios(true);
  const [mentorAssignment, setMentorAssignment] = useState<IMentorAssignmentByUser>({
    selectBox: [],
    teachers: []
  });

  const splitDistance = (
    distance: string
  ): {
    lat: number;
    lng: number;
  } => {
    const d = distance.split(",");
    return { lat: parseFloat(d[0]), lng: parseFloat(d[1]) };
  };

  const calculateDistance = (schoolDist: string, mentorDist: string): number => {
    const R = 6371; // Radio de la Tierra en km
    const schoolD = splitDistance(schoolDist);
    const mentorD = splitDistance(mentorDist);

    const dLat = ((mentorD.lat - schoolD.lat) * Math.PI) / 180;
    const dLng = ((mentorD.lng - schoolD.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((schoolD.lat * Math.PI) / 180) *
        Math.cos((mentorD.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<IMentorAssignmentByUser> =
          await useRequest.get("/mentorAssignment/user");

        if (isMounted) {
          const { data } = res;
          setMentorAssignment(data);
        }
      } catch (error) {
        handleAxiosError(error, "listado de eventos", "obtener");
      }
    };
    if (mentorAssignment.selectBox.length === 0 && mentorAssignment.teachers.length === 0) fetchData();

    return (): void => {
      isMounted = false;
    };
  }, [mentorAssignment.selectBox.length, mentorAssignment.teachers.length]);

  return { mentorAssignment, calculateDistance };
};

export { useMentor };
