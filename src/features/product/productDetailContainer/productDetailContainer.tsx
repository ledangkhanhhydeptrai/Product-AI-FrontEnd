import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productRequestById } from "../productSlice";
import { RootState } from "../../../app/store";

const ProductDetailContainer: React.FC = () => {
  const { id } = useParams();
  console.log("PARAM ID =", id);
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (id) {
      dispatch(productRequestById(id));
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-96 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-6">{product.name}</h1>

      <div className="mt-4 text-2xl font-semibold text-indigo-600">
        ${product.price}
      </div>
    </div>
  );
};

export default ProductDetailContainer;
