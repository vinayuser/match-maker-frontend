import { Outlet, useLocation } from "react-router-dom";
import BaseLayout from "@/components/layout/BaseLayout";
import PublicHeader from "@/components/navigation/PublicHeader";
import { OnboardingProvider } from "@/features/onboarding/OnboardingContext";
import { ROUTE_PATHS } from "@/routes/paths";

function PublicLayout() {
  const { pathname } = useLocation();
  const isOnboardingRoute = pathname.startsWith("/onboarding");
  const hideHeader =
    isOnboardingRoute ||
    pathname === ROUTE_PATHS.VERIFICATION_PENDING ||
    pathname === ROUTE_PATHS.LOGIN ||
    pathname === ROUTE_PATHS.SIGN_UP;

  return (
    <BaseLayout variant="public">
      {!hideHeader && <PublicHeader />}
      <OnboardingProvider>
        <div className={hideHeader ? "" : "pt-20 public-page-content"}>
          <Outlet />
        </div>
      </OnboardingProvider>
    </BaseLayout>
  );
}

export default PublicLayout;
