import BrandContainerAll from "../../features/brands/brandContainer/brandContainerAll";
import MainLayout from "../../layouts/MainLayout";
import BrandPage from "../../pages/brands/BrandPage";

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
        <BrandContainerAll />
      </MainLayout>
    )
  }
];
