import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getCartRequest } from "../CartSlice";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import CartCard from "../components/CartCard";
import { productRequestById } from "../../product/productSlice";

export default function CartContainer() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.cart);
  console.log("Cart:", data);
  React.useEffect(() => {
    dispatch(getCartRequest());
  }, [dispatch]);
  React.useEffect(() => {
    if (!data.length) return;

    data.forEach((cart) => {
      cart.cart_items.forEach((item) => {
        dispatch(productRequestById(item.product_id));
      });
    });
  }, [data, dispatch]);
  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!data.length) return <EmptyState />;

  return (
    <div className="cart-wrap">
      {data.map((cart) => {
        return <CartCard key={cart.id} cart={data} />;
      })}
    </div>
  );
}
