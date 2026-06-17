import { useAppSelector } from "../../../hooks/useAppSelector";
import { CartUserProps } from "../CartAPI";
import { ShoppingBag, Clock } from "lucide-react";

interface CartCardProps {
  cart: CartUserProps;
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

export default function CartCard({ cart }: CartCardProps) {
  const product = useAppSelector((state) => state.product.product);

  const cartTotal = cart.cart_items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartQty = cart.cart_items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
            className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/60 transition-colors"
          >
            <img
              src={product?.image_url}
              alt={product?.name}
              className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
            />

            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {product?.name}
              </p>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {shortPid(item.product_id)}
              </p>
              <span className="inline-block mt-1.5 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                SL: {item.quantity}
              </span>
            </div>

            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400">{formatVND(item.price)}</p>
              <p className="font-semibold text-gray-900 mt-0.5">
                {formatVND(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-4 bg-gray-50/80 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{cartQty}</span> sản phẩm
        </span>

        <div className="text-right">
          <p className="text-[11px] text-gray-400 uppercase tracking-wide">
            Tổng cộng
          </p>
          <span className="font-bold text-indigo-600 text-lg">
            {formatVND(cartTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
