import React from "react";
import {
  ShoppingBag,
  Calendar,
  CreditCard,
  MapPin,
  Package,
  Receipt,
  Wallet,
  CheckCircle,
  Star,
  X
} from "lucide-react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getOrderRequest } from "../OrderSlice";
import { createPaymentRequest } from "../../payment/paymentSlice";
import { productRequest } from "../../product/productSlice";
import { ORDER_STATUS } from "../OrderTypes/OrderProps";

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
  switch (status) {
    case ORDER_STATUS.PENDING:
      return "bg-[#fbe9d0] text-[#b5562b]";

    case ORDER_STATUS.DELIVERED:
      return "bg-emerald-100 text-emerald-700";

    case ORDER_STATUS.CANCELLED:
      return "bg-rose-100 text-rose-600";

    case ORDER_STATUS.PAID:
      return "bg-emerald-100 text-emerald-700";

    case ORDER_STATUS.SHIPPED:
      return "bg-sky-100 text-sky-700";

    default:
      return "bg-[#efe5d2] text-[#8a7860]";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return "Chờ xử lý";

    case ORDER_STATUS.DELIVERED:
      return "Hoàn tất";

    case ORDER_STATUS.CANCELLED:
      return "Đã hủy";

    case ORDER_STATUS.PAID:
      return "Đã thanh toán";

    case ORDER_STATUS.SHIPPED:
      return "Đang giao hàng";

    default:
      return status;
  }
};

const OrderContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [openReviewOrderId, setOpenReviewOrderId] = React.useState<
    string | null
  >(null);
  const [rating, setRating] = React.useState<number>(5);
  const [hoverRating, setHoverRating] = React.useState<number>(0);
  const [comment, setComment] = React.useState("");
  const { data, loading, error } = useAppSelector((state) => state.order);
  const ProductProps = useAppSelector((state) => state.product.data);

  React.useEffect(() => {
    dispatch(getOrderRequest());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(productRequest());
  }, [dispatch]);

  const handlePayment = (order_id: string) => {
    dispatch(createPaymentRequest({ order_id }));
  };

  const handleSubmitReview = (order_id: string) => {
    // TODO: wire up to a real review action
    console.log({ order_id, rating, comment });
    setOpenReviewOrderId(null);
    setRating(5);
    setComment("");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-[#8a7860]">
        <div className="w-8 h-8 rounded-full border-2 border-[#e3d7bf] border-t-[#b5562b] animate-spin" />
        <p className="text-sm">Đang tải đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-16">
        <p className="text-sm text-rose-500 bg-rose-50 px-4 py-3 rounded-xl">
          {error}
        </p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-[#f6f1e7] rounded-2xl py-16 mt-10">
        <div className="flex flex-col items-center text-center">
          <div className="p-5 rounded-full bg-[#fbe9d0] mb-4 ring-4 ring-[#f6f1e7]">
            <ShoppingBag className="w-9 h-9 text-[#b5562b]" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif text-base text-[#3d2c1e]">
            Bạn chưa có đơn hàng nào
          </h3>
          <p className="text-sm text-[#a99776] mt-1">
            Hãy khám phá cửa hàng và đặt món yêu thích của bạn
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f1e7] space-y-6 py-2">
      {data.map((order) => {
        const isPending = order.status === ORDER_STATUS.PENDING;
        const isPaidOrFurther =
          order.status === ORDER_STATUS.PAID ||
          order.status === ORDER_STATUS.SHIPPED ||
          order.status === ORDER_STATUS.DELIVERED;
        const canReview = order.status === ORDER_STATUS.DELIVERED;
        const isCancelled = order.status === ORDER_STATUS.CANCELLED;
        const isReviewOpen = openReviewOrderId === order.id;

        return (
          <div
            key={order.id}
            className="bg-[#fffdf8] rounded-2xl shadow-[0_1px_3px_rgba(61,44,30,0.08)] overflow-hidden border border-[#efe5d2]"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-6 py-4 bg-[#3d2c1e]">
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
                className={`px-3 py-1 rounded-full text-xs font-medium self-start sm:self-auto ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusLabel(order.status)}
              </span>
            </div>

            {/* Info */}
            <div className="px-5 sm:px-6 py-5 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
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

              {/* Order Items */}
              <div>
                <h4 className="font-serif text-sm text-[#3d2c1e] mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#b5562b]" />
                  Sản phẩm đã đặt
                </h4>

                <div className="rounded-xl border border-dashed border-[#e3d7bf] divide-y divide-dashed divide-[#e3d7bf] overflow-hidden">
                  {order.order_items.map((item, idx) => {
                    const product = ProductProps.find(
                      (p) => p.id === item.product_id
                    );

                    return (
                      <div
                        key={item.id}
                        className="flex justify-between items-center px-4 py-3 hover:bg-[#fbf6ea] transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-serif text-xs text-[#c7b692] w-5 shrink-0 pt-0.5">
                            {(idx + 1).toString().padStart(2, "0")}
                          </span>

                          <div>
                            <p className="text-sm text-[#3d2c1e] font-medium">
                              {product
                                ? product.name
                                : item.product_id.slice(0, 8)}
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
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-dashed border-[#e3d7bf] pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  {isPending && (
                    <button
                      onClick={() => handlePayment(order.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#b5562b] text-[#fffdf8] text-sm font-medium hover:bg-[#9c4720] active:scale-[0.98] transition-all shadow-[0_2px_6px_rgba(181,86,43,0.35)]"
                    >
                      <Wallet className="w-4 h-4" />
                      Thanh toán ngay
                    </button>
                  )}

                  {isPaidOrFurther && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Đã thanh toán
                    </span>
                  )}

                  {isCancelled && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-600 text-sm font-medium">
                      <X className="w-4 h-4" />
                      Đơn hàng đã hủy
                    </span>
                  )}

                  {canReview && (
                    <button
                      onClick={() =>
                        setOpenReviewOrderId(isReviewOpen ? null : order.id)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#e3d7bf] text-[#3d2c1e] text-sm font-medium hover:bg-[#fbf6ea] transition-colors"
                    >
                      <Star className="w-4 h-4 text-[#e8a06b]" />
                      Đánh giá đơn hàng
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className="text-xs text-[#a99776] sm:hidden">
                    Tổng thanh toán
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#b5562b]">
                    {formatVND(order.total_price)}
                  </span>
                </div>
              </div>

              {/* Review panel */}
              {isReviewOpen && (
                <div className="border-t border-dashed border-[#e3d7bf] pt-4 space-y-3">
                  <p className="font-serif text-sm text-[#3d2c1e]">
                    Đánh giá đơn hàng
                  </p>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0.5"
                        aria-label={`${star} sao`}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "text-[#e8a06b] fill-[#e8a06b]"
                              : "text-[#e3d7bf]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Chia sẻ cảm nhận của bạn về sản phẩm và dịch vụ..."
                    rows={3}
                    className="w-full border border-[#e3d7bf] rounded-xl p-3 text-sm text-[#3d2c1e] placeholder:text-[#c7b692] focus:outline-none focus:ring-2 focus:ring-[#e8a06b] resize-none"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSubmitReview(order.id)}
                      className="px-4 py-2 rounded-full bg-[#b5562b] text-white text-sm font-medium hover:bg-[#9c4720] transition-colors"
                    >
                      Gửi đánh giá
                    </button>

                    <button
                      onClick={() => setOpenReviewOrderId(null)}
                      className="px-4 py-2 rounded-full border border-[#e3d7bf] text-[#3d2c1e] text-sm font-medium hover:bg-[#fbf6ea] transition-colors"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderContainer;
