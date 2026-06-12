import React from "react";
import { ProductProps } from "../../../features/product/productTypes";
import ProductCard from "../../../features/product/components/ProductCard";

interface Props {
  products: ProductProps;
}

const ProductSection: React.FC<Props> = ({ products }) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-medium text-gray-900">
          Recommended for you
        </h2>
      </div>
      <ProductCard product={products} />
    </section>
  );
};

export default ProductSection;
