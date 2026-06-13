// src/layouts/MainLayout.tsx

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={0} onSearchSubmit={() => {}} />
      <main className="px-6 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
