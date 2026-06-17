import { useAppSelector } from "../../../hooks/useAppSelector";
import { CartUserProps } from "../CartAPI";
import { ShoppingBag, Clock, Minus, Plus, Trash2 } from "lucide-react";

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
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        {/* Header skeleton */}
        <div className="flex items-center justify-between px-5 py-4 bg-linear-to-r from-indigo-50 via-violet-50 to-purple-50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white shadow-sm">
              <ShoppingBag className="w-4 h-4 text-indigo-300 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3.5 w-32 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-2.5 w-24 bg-gray-100 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="h-6 w-24 bg-white/70 rounded-full animate-pulse" />
        </div>

        {/* Item rows skeleton */}
        <div className="divide-y divide-gray-50">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-3/5 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-2.5 w-2/5 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-6 w-28 bg-gray-100 rounded-full animate-pulse" />
              </div>
              <div className="h-4 w-16 bg-gray-100 rounded-full animate-pulse shrink-0" />
            </div>
          ))}
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between px-5 py-4 bg-gray-50/80 border-t border-gray-100">
          <div className="h-3.5 w-20 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-5 w-28 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  const cartTotal = cart.cart_items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartQty = cart.cart_items.reduce((sum, item) => sum + item.quantity, 0);

  const handleDecrease = (productId: string, currentQty: number) => {
    if (currentQty <= 1) return;
    onUpdateQuantity(productId, currentQty - 1);
  };

  const handleIncrease = (productId: string, currentQty: number) => {
    onUpdateQuantity(productId, currentQty + 1);
  };

  return (
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
