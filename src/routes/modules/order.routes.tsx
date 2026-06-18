import { MainLayout } from "../../layouts/MainLayout";
import OrderPage from "../../pages/order/OrderPage";

export const OrderRoutes = [
  {
    path: "/orders",
    element: (
      <MainLayout>
        <OrderPage />
      </MainLayout>
    )
  }
];
