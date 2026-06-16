import { useAppSelector } from "../../../hooks/useAppSelector";
import { CartUserProps } from "../CartAPI";

interface CartCardProps {
  cart: CartUserProps[];
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
    d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  );
}

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount);
}

export default function CartCard({ cart }: CartCardProps) {
  const products = useAppSelector((state) => state.product.product);
  if (!products) {
    return null;
  }

  const totalItems = cart.reduce((s, c) => s + c.cart_items.length, 0);
  const totalQty = cart.reduce(
    (s, c) => s + c.cart_items.reduce((a, i) => a + i.quantity, 0),
    0
  );
  const grandTotal = cart.reduce(
    (s, c) => s + c.cart_items.reduce((a, i) => a + i.price * i.quantity, 0),
    0
  );

  return (
    <div className="space-y-6 py-2">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Loại sản phẩm</p>
          <p className="text-xl font-medium text-gray-900">{totalItems}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Tổng số lượng</p>
          <p className="text-xl font-medium text-gray-900">{totalQty}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Tổng tiền</p>
          <p className="text-xl font-medium text-indigo-600">
            {formatVND(grandTotal)}
          </p>
        </div>
      </div>

      {/* Cart cards */}
      {cart.map((cartItem) => {
        const cartTotal = cartItem.cart_items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const cartQty = cartItem.cart_items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        return (
          <div
            key={cartItem.id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Giỏ hàng {shortId(cartItem.id)}
                  </p>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                    {cartItem.user_id.slice(0, 16)}…
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-2.5 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formatDate(cartItem.created_at)}
              </div>
            </div>

            {/* Items */}
            <div>
              {cartItem.cart_items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 last:border-b-0"
                  >
                    <img
                      src={products.image_url}
                      alt={products.name}
                      className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {products.name}
                      </p>
                      <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                        {shortPid(item.product_id)}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5">
                        Số lượng: {item.quantity}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">
                        {formatVND(item.price)} / cái
                      </p>
                      <p className="text-sm font-medium text-gray-900 mt-0.5">
                        {formatVND(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
              <span className="text-sm text-gray-500">{cartQty} sản phẩm</span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-500">Tổng cộng</span>
                <span className="text-lg font-medium text-indigo-600">
                  {formatVND(cartTotal)}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
          Xóa tất cả
        </button>
        <button className="flex-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          Thanh toán ngay
        </button>
      </div>
    </div>
  );
}
