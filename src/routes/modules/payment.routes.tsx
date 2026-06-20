import { MainLayout } from "../../layouts/MainLayout";
import PaymentFailedPage from "../../pages/payment/PaymentFailedPage";
import PaymentPage from "../../pages/payment/PaymentPage";
import PaymentSuccessPage from "../../pages/payment/PaymentSuccessPage";

const PaymentRoutes = [
  {
    path: "/payment/success",
    element: (
      <MainLayout>
        <PaymentSuccessPage />
      </MainLayout>
    )
  },
  {
    path: "/payment/cancel",
    element: (
      <MainLayout>
        <PaymentFailedPage />
      </MainLayout>
    )
  },
  {
    path: "/payment/:order_id",
    element: (
      <MainLayout>
        <PaymentPage />
      </MainLayout>
    )
  }
];
export default PaymentRoutes;
