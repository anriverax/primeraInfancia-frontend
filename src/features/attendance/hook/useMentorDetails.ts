import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { ILastAttendance } from "../attendance.type";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";

const useMentorDetails = (
  setSelectedId: Dispatch<SetStateAction<number>>
): {
  events: {
    id: number;
    name: string;
  }[];
  lastAttendance: ILastAttendance[];
  calculateDistance: (schoolDist: string, mentorDist: string) => number;
} => {
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

  const { data: lastAttendance } = useQueryRequest<ILastAttendance[]>(
    "last-attendance",
    "/attendance/lastAttendance",
    true,
    "última asistencia"
  );

  const events = lastAttendance
    ? lastAttendance.map((item) => ({
        id: item.id,
        name: item.event
      }))
    : [];

  // Only set selectedId automatically the first time events become non-empty
  const prevEventsLength = useRef<number>(0);

  useEffect(() => {
    if (events.length > 0 && prevEventsLength.current === 0) {
      setSelectedId(events[0].id);
    }
    prevEventsLength.current = events.length;
  }, [events, setSelectedId]);

  return {
    events: events as { id: number; name: string }[],
    lastAttendance: lastAttendance as ILastAttendance[],
    calculateDistance
  };
};

export { useMentorDetails };
