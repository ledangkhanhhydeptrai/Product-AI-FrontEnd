import { AdminLayout } from "../../admin/layouts/AdminLayout";
import ProductAdminContainer from "../../admin/product/productAdminContainer/productAdminContainer";
import ProductContainerAll from "../../features/product/productContainer/ProductContainerAll";
import { MainLayout } from "../../layouts/MainLayout";

import ProductDetailPage from "../../pages/products/id/ProductDetailPage";
import ProductListPage from "../../pages/products/ProductListPage";

export const productRoutes = [
  {
    path: "/products",
    element: (
      <MainLayout>
        <ProductListPage />
      </MainLayout>
    )
  },
  {
    path: "/productAll",
    element: (
      <MainLayout>
        <ProductContainerAll />
      </MainLayout>
    )
  },
  {
    path: "/products/:id",
    element: (
      <MainLayout>
        <ProductDetailPage />
      </MainLayout>
    )
  },
  {
    path: "/productAdmin",
    element: (
      <AdminLayout>
        <ProductAdminContainer />
      </AdminLayout>
    )
  },
];
