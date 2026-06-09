import React from "react";
import { ShoppingCart } from "lucide-react";
import { ProductProps } from "../productTypes";

export interface ProductCardProps {
  product: ProductProps;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-gray-300 transition-colors">
      <div className="h-36 bg-gray-50 flex items-center justify-center text-gray-300">
        <ShoppingCart size={40} />
      </div>

      <div className="p-4">
        <h3 className="text-[15px] font-medium text-gray-900 mb-3 leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-blue-600">
            ${product.price}
          </span>
          <button className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors text-gray-700">
            <ShoppingCart size={14} />
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
