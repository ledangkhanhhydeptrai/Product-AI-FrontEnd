import MainLayout from "../../layouts/MainLayout";
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
    path: "/products/:id",
    element: (
      <MainLayout>
        <ProductDetailPage />
      </MainLayout>
    )
  }
];
