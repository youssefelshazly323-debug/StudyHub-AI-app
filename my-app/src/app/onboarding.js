import { Onboarding } from "../../App";
import { useAppNavigation } from "../navigation";

export default function OnboardingRoute() {
  const navigate = useAppNavigation();
  return <Onboarding onDone={() => navigate("Auth", true)} />;
}
