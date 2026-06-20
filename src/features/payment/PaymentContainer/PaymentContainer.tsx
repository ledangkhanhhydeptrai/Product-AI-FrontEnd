import React, { useEffect } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { createPaymentRequest } from "../paymentSlice";

const PaymentContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { order_id } = useParams();

  const { loading, error, orderData } = useAppSelector(
    (state) => state.payment
  );
  useEffect(() => {
    if (order_id) {
      dispatch(createPaymentRequest({ order_id }));
    }
  }, [dispatch, order_id]);
  useEffect(() => {
    console.log("PAYMENT PAGE MOUNT");
  }, []);
  useEffect(() => {
    console.log("ORDER DATA =", orderData);
    if (!orderData) return;
    if (orderData.checkout_url) {
      console.log("REDIRECT:", orderData.checkout_url);
      window.location.href = orderData.checkout_url;
    }
  }, [orderData]);

  if (loading) {
    return (
      <div className="min-h-125 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-[#b5562b]" />
          <p className="mt-4 text-[#3d2c1e] font-medium">
            Đang khởi tạo thanh toán...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-125 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <p className="text-rose-500 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-125 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-[#fbe9d0] mx-auto flex items-center justify-center">
          <CreditCard className="w-8 h-8 text-[#b5562b]" />
        </div>

        <h2 className="mt-4 text-xl font-bold text-[#3d2c1e]">
          Thanh toán đơn hàng
        </h2>

        <p className="mt-2 text-sm text-[#8a7860]">
          Hệ thống đang chuyển bạn đến cổng thanh toán{" "}
          {orderData && orderData.checkout_url}
        </p>

        <div className="mt-6">
          <div className="h-2 bg-[#efe5d2] rounded-full overflow-hidden">
            <div className="h-full w-full animate-pulse bg-[#b5562b]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentContainer;
