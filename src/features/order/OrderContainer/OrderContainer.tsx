import React from "react";
import {
  ShoppingBag,
  Calendar,
  CreditCard,
  MapPin,
  Package,
  Receipt
} from "lucide-react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getOrderRequest } from "../OrderSlice";

const formatVND = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("vi-VN");
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-[#fbe9d0] text-[#b5562b]";
    case "completed":
      return "bg-emerald-100 text-emerald-700";
    case "cancelled":
      return "bg-rose-100 text-rose-600";
    default:
      return "bg-[#efe5d2] text-[#8a7860]";
  }
};

const getStatusLabel = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "Chờ xử lý";
    case "completed":
      return "Hoàn tất";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

const OrderContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state) => state.order);

  React.useEffect(() => {
    dispatch(getOrderRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-[#8a7860]">
        <p>Đang tải đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-10 text-rose-500">{error}</div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-[#f6f1e7] rounded-2xl py-16 mt-24">
        <div className="flex flex-col items-center text-center">
          <div className="p-5 rounded-full bg-[#fbe9d0] mb-4 ring-4 ring-[#f6f1e7]">
            <ShoppingBag className="w-9 h-9 text-[#b5562b]" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif text-base text-[#3d2c1e]">
            Bạn chưa có đơn hàng nào mời bạn mua hàng
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f1e7] rounded-2xl space-y-5">
      {data.map((order) => (
        <div
          key={order.id}
          className="bg-[#fffdf8] rounded-2xl shadow-[0_1px_2px_rgba(61,44,30,0.06)] overflow-hidden"
        >
          {/* Header — tem đóng dấu, đồng bộ CartCard */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 sm:px-6 py-4 bg-[#3d2c1e]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border-2 border-[#e8a06b] flex items-center justify-center shrink-0">
                <Receipt className="w-4 h-4 text-[#e8a06b]" />
              </div>
              <div>
                <p className="font-serif text-sm text-[#fffdf8] tracking-wide">
                  Đơn hàng #{order.id.slice(0, 8).toUpperCase()}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#bfa888] mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(order.created_at)}
                </div>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium self-start md:self-auto ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusLabel(order.status)}
            </span>
          </div>

          {/* Perforation strip */}
          <div className="h-3 bg-[#fffdf8]" />

          {/* Info */}
          <div className="px-5 sm:px-6 py-5 space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#b5562b] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#a99776]">Địa chỉ giao hàng</p>
                  <p className="text-sm text-[#3d2c1e] font-medium mt-0.5">
                    {order.shipping_address}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CreditCard className="w-5 h-5 text-[#b5562b] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#a99776]">
                    Phương thức thanh toán
                  </p>
                  <p className="text-sm text-[#3d2c1e] font-medium mt-0.5">
                    {order.payment_method}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items — dạng mục biên lai đánh số */}
            <div>
              <h4 className="font-serif text-sm text-[#3d2c1e] mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#b5562b]" />
                Sản phẩm đã đặt
              </h4>

              <div className="rounded-xl border border-dashed border-[#e3d7bf] divide-y divide-dashed divide-[#e3d7bf] overflow-hidden">
                {order.order_items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center px-4 py-3 hover:bg-[#fbf6ea] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-serif text-xs text-[#c7b692] w-5 shrink-0 pt-0.5">
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm text-[#3d2c1e] font-medium font-mono">
                          {item.product_id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-[#a99776] mt-0.5">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs text-[#a99776] font-mono">
                        {formatVND(item.price)}
                      </p>
                      <p className="font-mono font-semibold text-[#b5562b] mt-0.5">
                        {formatVND(item.subtotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-dashed border-[#e3d7bf] pt-4 flex justify-between items-center">
              <span className="font-serif text-sm text-[#3d2c1e]">
                Tổng thanh toán
              </span>

              <span className="font-mono text-2xl font-bold text-[#b5562b]">
                {formatVND(order.total_price)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderContainer;
