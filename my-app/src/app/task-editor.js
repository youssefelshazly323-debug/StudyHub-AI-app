import { TaskEditor } from "../../App";
import { useStudyHub } from "../context/StudyHubContext";
import { useAppNavigation } from "../navigation";
import { useLocalSearchParams } from "expo-router";

export default function TaskEditorRoute() {
  const navigate = useAppNavigation();
  const { tasks, setTasks } = useStudyHub();
  const { taskId } = useLocalSearchParams();

  const editingTask =
    taskId != null
      ? tasks.find((task) => String(task.id) === String(taskId))
      : null;

  return (
    <TaskEditor
      tasks={tasks}
      setTasks={setTasks}
      navigate={navigate}
      editingTask={editingTask}
    />
  );
}
