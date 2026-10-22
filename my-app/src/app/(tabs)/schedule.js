import { Schedule } from "../../../App";
import { useStudyHub } from "../../context/StudyHubContext";

export default function ScheduleRoute() {
  const { schedule, setSchedule } = useStudyHub();
  return (
    <Schedule
      schedule={schedule}
      setSchedule={setSchedule}
    />
  );
}
