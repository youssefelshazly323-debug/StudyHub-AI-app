import { Chat } from "../../../App";
import { useStudyHub } from "../../context/StudyHubContext";
import { useAppNavigation } from "../../navigation";

export default function ChatRoute() {
  const navigate = useAppNavigation();
  const { selectedFile } = useStudyHub();
  return <Chat selectedFile={selectedFile} navigate={navigate} />;
}
