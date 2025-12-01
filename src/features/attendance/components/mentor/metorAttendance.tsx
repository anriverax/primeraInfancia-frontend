import MentorView from "./mentorView";
// import MentorAttendanceHistory from "./table/mentorAttendanceHistory";

type MentorAttendanceProps = {
  isHistory: boolean;
};

export const MentorAttendance = ({ isHistory }: MentorAttendanceProps): React.JSX.Element => {
  // if (isHistory) return <MentorAttendanceHistory />;

  return (
    <div className="flex justify-center xl:gap-6">
      <MentorView />
    </div>
  );
};
