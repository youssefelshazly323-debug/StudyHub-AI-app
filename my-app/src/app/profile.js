import { Profile } from "../../App";
import { useAppNavigation } from "../navigation";

export default function ProfileRoute() {
  const navigate = useAppNavigation();
  return <Profile navigate={navigate} />;
}
