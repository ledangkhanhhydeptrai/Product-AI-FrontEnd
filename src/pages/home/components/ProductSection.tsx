import React from "react";
import { ProductProps } from "../../../features/product/productTypes";
import ProductCard from "../../../features/product/components/ProductCard";

interface Props {
  products: ProductProps;
}

const ProductSection: React.FC<Props> = ({ products }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[17px] font-semibold text-gray-900">
          Recommended for You
        </h2>
      </div>

      <ProductCard product={products} />
    </section>
  );
};

export default ProductSection;
