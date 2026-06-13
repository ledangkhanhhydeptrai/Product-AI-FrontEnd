import MainLayout from "../../layouts/MainLayout";
import BrandPage from "../../pages/brands/BrandPage";

export const brandRoutes = [
  {
    path: "/brand",
    element: (
      <MainLayout>
        <BrandPage />
      </MainLayout>
    )
  }
];
