import { ShoppingCart } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="mt-14 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="p-4 rounded-2xl bg-linear-to-br from-indigo-50 via-violet-50 to-purple-50 mb-4">
            <ShoppingCart
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
  );
}
