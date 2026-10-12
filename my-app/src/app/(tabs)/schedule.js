import { Schedule } from "../../../App";
import { useAppNavigation } from "../../navigation";

export default function ScheduleRoute() {
  const navigate = useAppNavigation();
  return <Schedule navigate={navigate} />;
}
