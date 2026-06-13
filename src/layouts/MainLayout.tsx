// src/layouts/MainLayout.tsx

import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChildrenProps } from "./AuthLayout";

const MainLayout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={0} onSearchSubmit={() => {}} />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
