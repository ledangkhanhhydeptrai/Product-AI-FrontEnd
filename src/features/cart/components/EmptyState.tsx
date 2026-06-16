import { ShoppingCart } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <ShoppingCart className="w-8 h-8 text-gray-400" />
      </div>
      <h2 className="text-base font-medium text-gray-900 mb-1">
        Giỏ hàng trống
      </h2>
      <p className="text-sm text-gray-400">Thêm sản phẩm để bắt đầu mua sắm.</p>
    </div>
  );
}
