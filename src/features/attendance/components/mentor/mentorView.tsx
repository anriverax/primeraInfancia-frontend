import { useMentorDetails } from "../../hook/useMentorDetails";
import MentorForm from "../../mentor/mentorForm";
import { useCallback, useState } from "react";
import CustomProgress from "@/shared/ui/custom/customProgress";
import MentorDetail from "./mentorDetails";

const MentorView = (): React.JSX.Element => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const { events, lastAttendance } = useMentorDetails(setSelectedId);

  const handleSelectionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(parseInt(e.target.value));
  }, []);

  const selectedAttendance = lastAttendance
    ? lastAttendance.find((a) => a.id === selectedId)
    : undefined;
  console.log(lastAttendance);
  if (!lastAttendance) {
    console.log("! ", !lastAttendance);
    return <CustomProgress />;
  }

  // If there are no attendance records yet, show the form to start one
  if (lastAttendance.length === 0) return <MentorForm />;

  return (
    <MentorDetail
      selectedId={selectedId}
      events={events}
      attendance={selectedAttendance}
      handleSelectionChange={handleSelectionChange}
    />
  );
};

export default MentorView;
