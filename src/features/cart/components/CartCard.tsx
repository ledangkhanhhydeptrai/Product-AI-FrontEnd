import { useAppSelector } from "../../../hooks/useAppSelector";
import { CartUserProps } from "../CartAPI";
import {
  ShoppingBag,
  Clock,
  Minus,
  Plus,
  Trash2,
  Sparkles
} from "lucide-react";

interface CartCardProps {
  cart: CartUserProps;
  onUpdateQuantity: (product_id: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

function shortId(id: string) {
  return "#" + id.slice(0, 8).toUpperCase();
}

function shortPid(id: string) {
  return id.slice(0, 8) + "…";
}

function formatDate(iso: string) {
  const d = new Date(iso);

  return (
    d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }) +
    " · " +
    d.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit"
    })
  );
}

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount);
}

export default function CartCard({
  cart,
  onUpdateQuantity,
  onRemoveItem
}: CartCardProps) {
  const product = useAppSelector((state) => state.product.product);

  if (!product) {
    return (
      <div className="bg-linear-to-br from-indigo-50/70 via-violet-50/40 to-purple-50/70 rounded-4xl p-4 sm:p-6">
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="p-4 rounded-2xl bg-linear-to-br from-indigo-100 via-violet-100 to-purple-100 mb-4">
              <ShoppingBag
                className="w-8 h-8 text-indigo-400"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              Giỏ hàng của bạn đang trống
            </h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Hiện tại chưa có sản phẩm nào trong giỏ hàng. Mời bạn tìm sản phẩm
              yêu thích để thêm vào giỏ nhé!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const cartTotal = cart.cart_items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartQty = cart.cart_items.reduce((sum, item) => sum + item.quantity, 0);

  const shippingFee = cartTotal >= 500000 || cartTotal === 0 ? 0 : 30000;
  const grandTotal = cartTotal + shippingFee;

  const handleDecrease = (productId: string, currentQty: number) => {
    if (currentQty <= 1) return;
    onUpdateQuantity(productId, currentQty - 1);
  };

  const handleIncrease = (productId: string, currentQty: number) => {
    onUpdateQuantity(productId, currentQty + 1);
  };

  return (
    <div className="bg-linear-to-br from-indigo-50/70 via-violet-50/40 to-purple-50/70 rounded-4xl p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* CỘT TRÁI — Danh sách sản phẩm */}
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-linear-to-r from-indigo-50 via-violet-50 to-purple-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white shadow-sm">
                <ShoppingBag className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Giỏ hàng {shortId(cart.id)}
                </p>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                  {cart.user_id.slice(0, 16)}…
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/70 px-2.5 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {formatDate(cart.created_at)}
            </div>
          </div>

          {/* Items */}
          <div className="divide-y divide-gray-50">
            {cart.cart_items.map((item) => (
              <div
                key={item.id}
                className="group flex items-center gap-4 px-5 py-4 hover:bg-gray-50/60 transition-colors"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-gray-100 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    {shortPid(item.product_id)}
                  </p>

                  {/* Quantity stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                      <button
                        type="button"
                        aria-label="Giảm số lượng"
                        onClick={() =>
                          handleDecrease(item.product_id, item.quantity)
                        }
                        disabled={item.quantity <= 1}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-medium text-gray-800 min-w-8 text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Tăng số lượng"
                        onClick={() =>
                          handleIncrease(item.product_id, item.quantity)
                        }
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      aria-label="Xóa sản phẩm"
                      onClick={() => onRemoveItem(item.id)}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-rose-500 px-2 py-1.5 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Xóa</span>
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-400">
                    {formatVND(item.price)}
                  </p>
                  <p className="font-semibold text-gray-900 mt-0.5">
                    {formatVND(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI — Tóm tắt đơn hàng (sticky) */}
        <div className="lg:sticky lg:top-6">
          <div className="bg-linear-to-b from-white to-indigo-50/60 border border-indigo-100 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="px-5 py-4 bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 border-b border-indigo-100">
              <p className="text-sm font-semibold text-white">
                Tóm tắt đơn hàng
              </p>
              <p className="text-[11px] text-indigo-100 mt-0.5">
                {cartQty} sản phẩm trong giỏ
              </p>
            </div>

            <div className="px-5 py-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Tạm tính</span>
                <span className="font-medium text-gray-800">
                  {formatVND(cartTotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Phí vận chuyển</span>
                <span
                  className={
                    shippingFee === 0
                      ? "font-medium text-emerald-600"
                      : "font-medium text-gray-800"
                  }
                >
                  {shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}
                </span>
              </div>

              {shippingFee > 0 && (
                <div className="flex items-start gap-2 text-xs text-indigo-700 bg-white border border-indigo-100 rounded-xl px-3 py-2">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-indigo-500" />
                  <span>
                    Mua thêm {formatVND(500000 - cartTotal)} để được miễn phí
                    vận chuyển
                  </span>
                </div>
              )}

              <div className="h-px bg-gray-100 my-1" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Tổng cộng
                </span>
                <span className="font-bold text-indigo-600 text-xl">
                  {formatVND(grandTotal)}
                </span>
              </div>
            </div>

            <div className="px-5 pb-5">
              <button
                type="button"
                className="w-full py-3 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold shadow-sm hover:shadow-md hover:from-indigo-700 hover:to-violet-700 active:scale-[0.98] transition-all cursor-pointer"
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
