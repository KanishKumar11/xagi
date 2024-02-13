import GettingStarted from "@/components/GettingStartedSteps";
import Header from "@/components/Header";
import AuthenticatedNavigation from "@/components/AuthenticatedNavigation";
import Logo from "@/components/Logo";
import Home from "@/components/pages/Home";

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <Home />
    </div>
  );
}
