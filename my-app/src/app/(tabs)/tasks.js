import { Tasks } from "../../../App";
import { useStudyHub } from "../../context/StudyHubContext";
import { useAppNavigation } from "../../navigation";

export default function TasksRoute() {
  const navigate = useAppNavigation();
  const { tasks, setTasks } = useStudyHub();
  return <Tasks tasks={tasks} setTasks={setTasks} navigate={navigate} />;
}
