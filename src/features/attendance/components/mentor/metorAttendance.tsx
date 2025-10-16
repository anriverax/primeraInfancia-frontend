import MentorView from "./mentorView";
import MentorAttendanceHistory from "./table/mentorAttendanceHistory";

type MentorAttendanceProps = {
  isHistory: boolean;
};

const MentorAttendance = ({ isHistory }: MentorAttendanceProps): React.JSX.Element => {
  if (isHistory) return <MentorAttendanceHistory />;

  return <MentorView />;
};

export default MentorAttendance;
