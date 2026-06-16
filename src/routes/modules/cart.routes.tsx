import MainLayout from "../../layouts/MainLayout";
import CartPage from "../../pages/Cart/CartPage";

export const CartRoutes = [
  {
    path: "/cart",
    element: (
      <MainLayout>
        <CartPage />
      </MainLayout>
    )
  }
];
