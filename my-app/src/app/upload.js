import { Upload } from "../../App";
import { useStudyHub } from "../context/StudyHubContext";
import { useAppNavigation } from "../navigation";

export default function UploadRoute() {
  const navigate = useAppNavigation();
  const { setFiles, selectedFile, setSelectedFile } = useStudyHub();
  return (
    <Upload
      setFiles={setFiles}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
      navigate={navigate}
    />
  );
}
