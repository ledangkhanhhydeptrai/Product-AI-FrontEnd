import React from "react";
import { ShoppingBag } from "lucide-react";
import { ProductProps } from "../productTypes";
import { useNavigate } from "react-router-dom";

export interface ProductCardProps {
  product: ProductProps;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-[14px] border border-gray-100 bg-white overflow-hidden hover:border-gray-200 transition-colors group">
      <div className="h-30 bg-indigo-50/60 flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <ShoppingBag size={32} className="text-indigo-300" />
        )}
      </div>

      <div className="p-3.5">
        <h3 className="text-[13px] font-medium text-gray-900 mb-2.5 leading-snug line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-[16px] font-medium text-indigo-600">
            ${product.price}
          </span>
          <button className="flex items-center gap-1.5 bg-[#1E1B4B] hover:bg-indigo-900 text-indigo-100 text-[12px] font-medium rounded-lg px-3 py-1.5 transition-colors">
            <ShoppingBag size={13} />
            Thêm
          </button>
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
