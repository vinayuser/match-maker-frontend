import { Outlet } from "react-router-dom";
import BaseLayout from "@/components/layout/BaseLayout";
import UserSidebar from "@/components/dashboard/UserSidebar";

function AuthenticatedLayout() {
  return (
    <BaseLayout variant="auth">
      <UserSidebar />
      <div className="lg:pl-64">
        <Outlet />
      </div>
    </BaseLayout>
  );
}

export default AuthenticatedLayout;
