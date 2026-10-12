import { TaskEditor } from "../../App";
import { useStudyHub } from "../context/StudyHubContext";
import { useAppNavigation } from "../navigation";

export default function TaskEditorRoute() {
  const navigate = useAppNavigation();
  const { setTasks } = useStudyHub();
  return <TaskEditor setTasks={setTasks} navigate={navigate} />;
}
