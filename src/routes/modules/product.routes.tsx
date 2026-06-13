import ProductDetailPage from "../../pages/products/id/ProductDetailPage";
import ProductListPage from "../../pages/products/ProductListPage";

export const productRoutes = [
  {
    path: "/products",
    element: <ProductListPage />
  },
  {
    path: "/products/:id",
    element: <ProductDetailPage />
  }
];
