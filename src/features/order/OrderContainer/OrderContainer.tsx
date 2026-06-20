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
  X,
  MessageSquareText
} from "lucide-react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getOrderRequest } from "../OrderSlice";
import { createPaymentRequest } from "../../payment/paymentSlice";
import { productRequest } from "../../product/productSlice";
import { ORDER_STATUS } from "../OrderTypes/OrderProps";
import {
  createReviewRequest,
  getReviewRequest
} from "../../review/reviewSlice";

const formatVND = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("vi-VN");
};

const getStatusDot = (status: string) => {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return "bg-amber-400";
    case ORDER_STATUS.DELIVERED:
      return "bg-emerald-500";
    case ORDER_STATUS.CANCELLED:
      return "bg-rose-500";
    case ORDER_STATUS.PAID:
      return "bg-emerald-500";
    case ORDER_STATUS.SHIPPED:
      return "bg-sky-500";
    default:
      return "bg-stone-400";
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
  const [rating, setRating] = React.useState<number>(5);
  const [hoverRating, setHoverRating] = React.useState<number>(0);
  const [comment, setComment] = React.useState("");
  const { data, loading, error } = useAppSelector((state) => state.order);
  const reviews = useAppSelector((state) => state.review.review);
  const products = useAppSelector((state) => state.product.data);
  const [selectedProductId, setSelectedProductId] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    dispatch(getOrderRequest());
    dispatch(productRequest());
  }, [dispatch]);

  const handlePayment = (order_id: string) => {
    dispatch(createPaymentRequest({ order_id }));
  };

  const handleSubmitReview = (product_id: string) => {
    dispatch(
      createReviewRequest({
        product_id,
        rating,
        comment
      })
    );

    // 👉 quan trọng: reload review sau khi tạo
    dispatch(getReviewRequest());

    setSelectedProductId(null);
    setRating(5);
    setComment("");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-stone-400">
        <div className="w-9 h-9 rounded-full border-2 border-stone-200 border-t-orange-700 animate-spin" />
        <p className="text-sm tracking-wide">Đang tải đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-24">
        <p className="text-sm text-rose-600 bg-rose-50 ring-1 ring-rose-200 px-5 py-3 rounded-xl">
          {error}
        </p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-stone-50 rounded-3xl py-24 mt-10 border border-stone-100">
        <div className="flex flex-col items-center text-center px-6">
          <div className="p-5 rounded-full bg-white mb-5 shadow-sm">
            <ShoppingBag
              className="w-9 h-9 text-orange-700"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="font-serif text-lg text-stone-800">
            Bạn chưa có đơn hàng nào
          </h3>
          <p className="text-sm text-stone-400 mt-1.5 max-w-xs">
            Hãy khám phá cửa hàng và đặt món yêu thích của bạn
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-2">
      {data.map((order) => {
        const isPending = order.status === ORDER_STATUS.PENDING;
        const isPaidOrFurther =
          order.status === ORDER_STATUS.PAID ||
          order.status === ORDER_STATUS.SHIPPED ||
          order.status === ORDER_STATUS.DELIVERED;
        const isCancelled = order.status === ORDER_STATUS.CANCELLED;

        return (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center shrink-0">
                  <Receipt className="w-4 h-4 text-orange-300" />
                </div>
                <div>
                  <p className="font-serif text-sm text-stone-900 tracking-wide">
                    Đơn hàng #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(order.created_at)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${getStatusDot(
                    order.status
                  )}`}
                />
                <span className="text-xs font-medium text-stone-600 uppercase tracking-wider">
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="px-6 py-5 space-y-5">
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-stone-400">Giao đến </span>
                    <span className="text-stone-700 font-medium">
                      {order.shipping_address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CreditCard className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-stone-400">Thanh toán qua </span>
                    <span className="text-stone-700 font-medium">
                      {order.payment_method}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-serif text-xs uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
                  <Package className="w-3.5 h-3.5" />
                  Sản phẩm đã đặt
                </h4>

                <div className="space-y-3">
                  {order.order_items.map((item, idx) => {
                    const product = products.find(
                      (p) => p.id === item.product_id
                    );
                    const isReviewing = selectedProductId === item.product_id;
                    const productReviews = reviews.filter(
                      (r) => r.product_id === item.product_id
                    );

                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border border-stone-100 overflow-hidden"
                      >
                        <div className="flex justify-between items-center px-4 py-3.5 bg-stone-50/50">
                          <div className="flex items-start gap-3">
                            <span className="font-serif text-xs text-stone-300 w-5 shrink-0 pt-0.5">
                              {(idx + 1).toString().padStart(2, "0")}
                            </span>

                            <div>
                              <p className="text-sm text-stone-800 font-medium">
                                {product
                                  ? product.name
                                  : item.product_id.slice(0, 8)}
                              </p>

                              <p className="text-xs text-stone-400 mt-0.5">
                                {item.quantity} × {formatVND(item.price)}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="font-mono font-semibold text-stone-800">
                              {formatVND(item.subtotal)}
                            </p>

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedProductId(
                                  isReviewing ? null : item.product_id
                                )
                              }
                              className="inline-flex items-center gap-1 text-xs text-orange-700 font-medium mt-1.5 hover:text-orange-800"
                            >
                              <Star className="w-3 h-3" />
                              {isReviewing ? "Đóng" : "Đánh giá"}
                            </button>
                          </div>
                        </div>

                        {/* Existing reviews */}
                        {productReviews.length > 0 && (
                          <div className="px-4 py-3 space-y-2 border-t border-stone-100">
                            {productReviews.map((review) => (
                              <div key={review.id} className="flex gap-2.5">
                                <MessageSquareText className="w-3.5 h-3.5 text-stone-300 mt-0.5 shrink-0" />
                                <div>
                                  <div className="flex items-center gap-0.5">
                                    {Array.from({
                                      length: review.rating
                                    }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className="w-3 h-3 text-orange-500 fill-orange-500"
                                      />
                                    ))}
                                  </div>
                                  <p className="text-xs text-stone-500 mt-1">
                                    {review.comment}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Review form */}
                        {isReviewing && (
                          <div className="p-4 space-y-3 border-t border-stone-100 bg-stone-50/50">
                            <p className="text-xs uppercase tracking-wider text-stone-400 font-serif">
                              Đánh giá của bạn
                            </p>

                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setRating(star)}
                                  onMouseEnter={() => setHoverRating(star)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  aria-label={`Đánh giá ${star} sao`}
                                >
                                  <Star
                                    className={`w-6 h-6 transition-colors ${
                                      star <= (hoverRating || rating)
                                        ? "text-orange-500 fill-orange-500"
                                        : "text-stone-200"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>

                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="w-full border border-stone-200 bg-white p-2.5 rounded-lg text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                              placeholder="Nhận xét của bạn..."
                              rows={3}
                            />

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleSubmitReview(item.product_id)
                                }
                                className="px-4 py-1.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 active:scale-[0.98] transition-all"
                              >
                                Gửi đánh giá
                              </button>

                              <button
                                type="button"
                                onClick={() => setSelectedProductId(null)}
                                className="px-4 py-1.5 border border-stone-200 text-stone-600 text-sm rounded-lg hover:bg-stone-100"
                              >
                                Hủy
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-stone-100 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  {isPending && (
                    <button
                      onClick={() => handlePayment(order.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-700 text-white text-sm font-medium hover:bg-orange-800 active:scale-[0.98] transition-all"
                    >
                      <Wallet className="w-4 h-4" />
                      Thanh toán ngay
                    </button>
                  )}

                  {isPaidOrFurther && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Đã thanh toán
                    </span>
                  )}

                  {isCancelled && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-medium">
                      <X className="w-4 h-4" />
                      Đơn hàng đã hủy
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className="text-xs text-stone-400 sm:hidden">
                    Tổng thanh toán
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-stone-900">
                    {formatVND(order.total_price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderContainer;
