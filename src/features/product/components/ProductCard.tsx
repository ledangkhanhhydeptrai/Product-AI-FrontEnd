import React from "react";
import { ShoppingBag } from "lucide-react";
import { ProductProps } from "../productTypes";
import { useNavigate } from "react-router-dom";

export interface ProductCardProps {
  product: ProductProps;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const originalPrice = (Number(product.price) * 1.15).toFixed(2);
  const hasDiscount = true; // thay bằng logic thật nếu có

  return (
    <div className="rounded-[14px] border border-slate-100 bg-white overflow-hidden hover:border-violet-200 hover:-translate-y-0.5 transition-all duration-150 group">
      {/* Image */}
      <div className="relative h-32 bg-violet-50 flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <ShoppingBag size={36} className="text-violet-300" />
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 text-[11px] font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
            -13%
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-3.5">
        <h3 className="text-[13px] font-medium text-slate-800 mb-2.5 leading-snug line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-end justify-between gap-2">
          <div>
            <span className="block text-[11px] text-slate-400 line-through leading-none mb-0.5">
              ${originalPrice}
            </span>
            <span className="text-[15px] font-semibold text-violet-700">
              ${product.price}
            </span>
          </div>

          <button className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-[12px] font-medium rounded-lg px-3 py-1.5 transition-colors">
            <ShoppingBag size={13} />
            Thêm
          </button>
        </div>

        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="mt-2.5 w-full rounded-lg border border-violet-200 text-violet-600 hover:bg-violet-50 hover:border-violet-300 text-[12px] font-medium py-1.5 transition-colors"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
