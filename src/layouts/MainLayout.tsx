import React, { useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChildrenProps } from "./AuthLayout";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getMeRequest } from "../features/auth/authSlice";

const MainLayout: React.FC<ChildrenProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMeRequest());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={0} onSearchSubmit={() => {}} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
