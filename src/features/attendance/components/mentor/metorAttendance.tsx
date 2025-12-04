import MentorView from "./mentorView";
// import MentorAttendanceHistory from "./table/mentorAttendanceHistory";

export const MentorAttendance = (): React.JSX.Element => {
  // if (isHistory) return <MentorAttendanceHistory />;

  return (
    <div className="flex justify-center xl:gap-6">
      <MentorView />
    </div>
  );
};
