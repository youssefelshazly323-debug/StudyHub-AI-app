import { Auth } from "../../App";
import { useAppNavigation } from "../navigation";

export default function AuthRoute() {
  const navigate = useAppNavigation();
  return <Auth onDone={() => navigate("Home", true)} />;
}
