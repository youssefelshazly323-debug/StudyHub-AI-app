import { Summary } from "../../App";
import { useStudyHub } from "../context/StudyHubContext";
import { useAppNavigation } from "../navigation";

export default function SummaryRoute() {
  const navigate = useAppNavigation();
  const { selectedFile } = useStudyHub();
  return <Summary selectedFile={selectedFile} navigate={navigate} />;
}
