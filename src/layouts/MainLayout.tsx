import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getCartRequest } from "../features/cart/CartSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import Header from "../components/Header";
import Footer from "../components/Footer";
interface ChildrenProps {
  children: React.ReactNode;
}
export const MainLayout: React.FC<ChildrenProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartRequest());
  }, [dispatch]);

  const cartItems = useAppSelector((state) => state.cart.data);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cartItems.reduce(
          (total, cart) => total + cart.cart_items.length,
          0
        )}
        onSearchSubmit={() => {}}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
