import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { XCircle, Home, RotateCcw } from "lucide-react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { failedPaymentRequest } from "../paymentSlice";

const REDIRECT_SECONDS = 4;

const PaymentFailedContainer: React.FC = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  const orderCode = params.get("orderCode");
  useEffect(() => {
    console.log("FAILED PAGE MOUNT");
  }, []);
  useEffect(() => {
    const code = Number(orderCode);
    if (!code) return;

    dispatch(failedPaymentRequest({ order_code: code }));

    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, REDIRECT_SECONDS * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [dispatch, navigate, orderCode]);

  const progress = ((REDIRECT_SECONDS - secondsLeft) / REDIRECT_SECONDS) * 100;

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f6f1e7] px-4">
      <div className="w-full max-w-md bg-[#fffdf8] rounded-3xl shadow-[0_8px_30px_rgba(61,44,30,0.08)] overflow-hidden">
        {/* Stamp header */}
        <div className="bg-[#3d2c1e] py-8 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-rose-400/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center ring-4 ring-rose-100/40">
              <XCircle className="w-11 h-11 text-rose-600" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Perforation strip */}
        <div className="relative h-4 bg-[#fffdf8]">
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#e3d7bf]" />
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 py-8 text-center">
          <h1 className="font-serif text-2xl text-[#3d2c1e]">
            Thanh toán thất bại
          </h1>
          <p className="text-sm text-[#a99776] mt-2">
            Giao dịch không thành công hoặc đã bị hủy. Vui lòng thử lại.
          </p>

          {orderCode && (
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbe9d0] text-[#b5562b] text-xs font-mono font-medium">
              Mã đơn hàng: #{orderCode}
            </div>
          )}

          {/* Progress bar */}
          <div className="mt-8">
            <div className="h-1.5 w-full bg-[#f0e8d6] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-[#a99776] mt-3 flex items-center justify-center gap-1.5">
              <Home className="w-3.5 h-3.5" />
              Tự động về trang chủ sau {secondsLeft}s...
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#e3d7bf] text-[#3d2c1e] text-sm font-medium hover:bg-[#fbf6ea] active:scale-[0.98] transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Thử lại
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#3d2c1e] text-[#fffdf8] text-sm font-medium hover:bg-[#2a1f15] active:scale-[0.98] transition-all"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedContainer;
