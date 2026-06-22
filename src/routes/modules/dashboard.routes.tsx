import DashboardPageAdmin from "../../admin/dashboard/dashboard";
import { AdminLayout } from "../../admin/layouts/AdminLayout";

export const dashboardRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <AdminLayout>
        <DashboardPageAdmin />
      </AdminLayout>
    )
  }
];