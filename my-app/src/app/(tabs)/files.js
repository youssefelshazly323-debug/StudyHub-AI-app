import { Files } from "../../../App";
import { useStudyHub } from "../../context/StudyHubContext";
import { useAppNavigation } from "../../navigation";

export default function FilesRoute() {
  const navigate = useAppNavigation();
  const { files, setSelectedFile } = useStudyHub();
  return (
    <Files
      files={files}
      setSelectedFile={setSelectedFile}
      navigate={navigate}
    />
  );
}
