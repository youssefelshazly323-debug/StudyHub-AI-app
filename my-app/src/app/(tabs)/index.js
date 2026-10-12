import { Home } from "../../../App";
import { useAppNavigation } from "../../navigation";

export default function HomeRoute() {
  const navigate = useAppNavigation();
  return <Home navigate={navigate} />;
}
