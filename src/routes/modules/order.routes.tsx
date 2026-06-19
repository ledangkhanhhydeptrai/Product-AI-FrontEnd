import { MainLayout } from "../../layouts/MainLayout";
import CreateOrderPage from "../../pages/order/createOrderPage";
import OrderPage from "../../pages/order/OrderPage";

export const OrderRoutes = [
  {
    path: "/orders",
    element: (
      <MainLayout>
        <OrderPage />
      </MainLayout>
    )
  },
  {
    path: "/createOrder",
    element: (
      <MainLayout>
        <CreateOrderPage />
      </MainLayout>
    )
  }
];
