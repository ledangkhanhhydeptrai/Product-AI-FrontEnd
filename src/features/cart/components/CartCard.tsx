import { useAppSelector } from "../../../hooks/useAppSelector";
import { CartItem, CartUserProps } from "../CartAPI";
import {
  ShoppingBag,
  Clock,
  Minus,
  Plus,
  Trash2,
  ScissorsLineDashed,
  Receipt
} from "lucide-react";

interface CartCardProps {
  cart: CartUserProps;
  onUpdateQuantity: (product_id: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  selectedItems: string[];
  onToggleItem: (cartItemId: string) => void;
  onCheckout: (cartItems: CartItem[]) => void;
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

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export default function CartCard({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  selectedItems,
  onToggleItem,
  onCheckout
}: CartCardProps) {
  const product = useAppSelector((state) => state.product.product);

  if (!product) {
    return (
      <div className="bg-[#f6f1e7] rounded-2xl p-4 sm:p-6">
        <div className="bg-[#fffdf8] border-2 border-dashed border-[#d8c9a8] rounded-2xl">
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="p-5 rounded-full bg-[#fbe9d0] mb-4 ring-4 ring-[#f6f1e7]">
              <ShoppingBag
                className="w-9 h-9 text-[#b5562b]"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="font-serif text-base text-[#3d2c1e] mb-1">
              Giỏ hàng của bạn còn trống
            </h3>
            <p className="text-sm text-[#8a7860] max-w-xs">
              Hiện tại chưa có sản phẩm nào trong giỏ hàng. Mời bạn tìm sản phẩm
              yêu thích để thêm vào giỏ nhé!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const selectedCartItems = cart.cart_items.filter((item) =>
    selectedItems.includes(item.id)
  );

  const cartTotal = selectedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartQty = selectedCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

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
    <div className="bg-[#f6f1e7] rounded-2xl p-3 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
        {/* CỘT TRÁI — Danh sách sản phẩm, dạng phiếu/biên lai */}
        <div className="bg-[#fffdf8] rounded-2xl shadow-[0_1px_2px_rgba(61,44,30,0.06)] overflow-hidden">
          {/* Header — tem đóng dấu */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#3d2c1e]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border-2 border-[#e8a06b] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#e8a06b]" />
              </div>
              <div>
                <p className="font-serif text-sm text-[#fffdf8] tracking-wide">
                  Phiếu giỏ hàng {shortId(cart.id)}
                </p>
                <p className="text-[11px] text-[#bfa888] font-mono mt-0.5">
                  {cart.user_id.slice(0, 16)}…
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#bfa888]">
              <Clock className="w-3.5 h-3.5" />
              {formatDate(cart.created_at)}
            </div>
          </div>

          {/* Perforation strip — đường răng cưa giả lập */}
          <div className="h-3 bg-[#fffdf8]" />

          {/* Items — đánh số như mục hóa đơn */}
          <div className="divide-y divide-dashed divide-[#e3d7bf]">
            {cart.cart_items.map((item, idx) => (
              <div
                key={item.id}
                className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 hover:bg-[#fbf6ea] transition-colors"
              >
                <span className="font-serif text-xs text-[#c7b692] w-5 shrink-0 hidden sm:block">
                  {pad2(idx + 1)}
                </span>

                <input
                  placeholder="Choose product"
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => onToggleItem(item.id)}
                  className="w-4 h-4 accent-[#b5562b] cursor-pointer shrink-0"
                />

                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#e3d7bf] shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#3d2c1e] font-medium truncate">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-[#a99776] font-mono mt-0.5">
                    {shortPid(item.product_id)}
                  </p>

                  <div className="flex items-center gap-2 mt-2.5">
                    <div className="flex items-center bg-[#f6f1e7] rounded-full overflow-hidden">
                      <button
                        type="button"
                        aria-label="Giảm số lượng"
                        onClick={() =>
                          handleDecrease(item.product_id, item.quantity)
                        }
                        disabled={item.quantity <= 1}
                        className="p-1.5 text-[#8a7860] hover:text-[#b5562b] hover:bg-[#efe5d2] disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-mono text-[#3d2c1e] min-w-8 text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Tăng số lượng"
                        onClick={() =>
                          handleIncrease(item.product_id, item.quantity)
                        }
                        className="p-1.5 text-[#8a7860] hover:text-[#b5562b] hover:bg-[#efe5d2] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      aria-label="Xóa sản phẩm"
                      onClick={() => onRemoveItem(item.id)}
                      className="flex items-center gap-1 text-xs text-[#a99776] hover:text-[#b5562b] px-2 py-1.5 rounded-full hover:bg-[#fbe9d0] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Xóa</span>
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs text-[#a99776] font-mono">
                    {formatVND(item.price)}
                  </p>
                  <p className="font-mono font-semibold text-[#3d2c1e] mt-0.5">
                    {formatVND(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI — Biên lai tổng (sticky) */}
        <div className="lg:sticky lg:top-6">
          <div className="bg-[#fffdf8] rounded-2xl shadow-[0_1px_2px_rgba(61,44,30,0.06)] overflow-hidden relative">
            {/* Notch hai bên giả lập vé xé */}
            <div className="absolute top-31 -left-2.5 w-5 h-5 rounded-full bg-[#f6f1e7] hidden lg:block" />
            <div className="absolute top-31 -right-2.5 w-5 h-5 rounded-full bg-[#f6f1e7] hidden lg:block" />

            <div className="px-6 py-4 bg-[#b5562b] flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#fbe9d0]" />
              <div>
                <p className="font-serif text-sm text-[#fffdf8] tracking-wide">
                  Hóa đơn tạm tính
                </p>
                <p className="text-[11px] text-[#fbe9d0] mt-0.5">
                  {cartQty} sản phẩm trong giỏ
                </p>
              </div>
            </div>

            <div className="h-3 bg-[#fffdf8]" />

            <div className="px-6 py-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#8a7860]">Tạm tính</span>
                <span className="font-mono text-[#3d2c1e]">
                  {formatVND(cartTotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#8a7860]">Phí vận chuyển</span>
                <span
                  className={
                    shippingFee === 0
                      ? "font-mono text-emerald-700"
                      : "font-mono text-[#3d2c1e]"
                  }
                >
                  {shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}
                </span>
              </div>

              {shippingFee > 0 && (
                <div className="flex items-start gap-2 text-xs text-[#b5562b] bg-[#fbe9d0] rounded-xl px-3 py-2">
                  <ScissorsLineDashed className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    Mua thêm {formatVND(500000 - cartTotal)} để được miễn phí
                    vận chuyển
                  </span>
                </div>
              )}

              <div className="border-t border-dashed border-[#e3d7bf] my-1" />

              <div className="flex items-center justify-between">
                <span className="font-serif text-sm text-[#3d2c1e]">
                  Tổng cộng
                </span>
                <span className="font-mono font-bold text-[#b5562b] text-2xl">
                  {formatVND(grandTotal)}
                </span>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                type="button"
                disabled={selectedCartItems.length === 0}
                onClick={() => onCheckout(selectedCartItems)}
                className="
    w-full py-3 rounded-xl text-sm font-medium tracking-wide transition-colors
    disabled:bg-[#d8c9a8]
    disabled:cursor-not-allowed
    bg-[#b5562b]
    text-[#fffdf8]
    hover:bg-[#9c4622]
  "
              >
                Đặt hàng ({selectedCartItems.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
