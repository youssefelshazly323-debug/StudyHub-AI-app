import { Splash } from "../../App";
import { useAppNavigation } from "../navigation";

export default function SplashRoute() {
  const navigate = useAppNavigation();
  return <Splash onDone={() => navigate("Onboarding", true)} />;
}
