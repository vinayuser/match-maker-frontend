import { Outlet } from "react-router-dom";
import BaseLayout from "@/components/layout/BaseLayout";

function AuthenticatedLayout() {
  return (
    <BaseLayout variant="auth">
      <Outlet />
    </BaseLayout>
  );
}

export default AuthenticatedLayout;
