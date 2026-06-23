import BrandContainer from "../../admin/brand/brandContainer/brandContainer";
import { AdminLayout } from "../../admin/layouts/AdminLayout";
import BrandContainerAll from "../../features/brands/brandContainer/brandContainerAll";
import { MainLayout } from "../../layouts/MainLayout";

import BrandPage from "../../pages/brands/BrandPage";
import BrandDetailPage from "../../pages/brands/id/BrandDetailPage";

export const brandRoutes = [
  {
    path: "/brands",
    element: (
      <MainLayout>
        <BrandPage />
      </MainLayout>
    )
  },
  {
    path: "/brandAll",
    element: (
      <MainLayout>
        <BrandContainerAll filterBrandId="" />
      </MainLayout>
    )
  },
  {
    path: "/brands/:id",
    element: (
      <MainLayout>
        <BrandDetailPage />
      </MainLayout>
    )
  },
  {
    path: "/admin/brand",
    element: (
      <AdminLayout>
        <BrandContainer />
      </AdminLayout>
    )
  }
];
