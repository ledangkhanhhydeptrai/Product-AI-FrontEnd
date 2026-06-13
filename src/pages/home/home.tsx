import React from "react";
import { NavbarProps } from "../../components/Header";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import AiAssistantBanner from "./components/AiAssistantBanner";
import FlashDealBanner from "./components/FlashDealBanner";
import ProductContainer from "../../features/product/productContainer/ProductContainer";

const categories = [
  { id: "electronics", name: "Electronics", icon: "⚡", count: "1.2k" },
  { id: "fashion", name: "Fashion", icon: "👗", count: "3.5k" },
  { id: "home", name: "Home & Living", icon: "🏡", count: "2.1k" }
];

const insights = [
  { label: "Perfect for you", value: "94%", sub: "match score" },
  { label: "Price drop alert", value: "12", sub: "items saved" },
  { label: "Trending now", value: "38", sub: "in your style" }
];

const HomePage: React.FC<NavbarProps> = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <main className="flex flex-col gap-9">
        {/* Hero — insights merged inside */}
        <HeroSection insights={insights} />

        {/* Categories */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <CategorySection categories={categories} />
        </div>

        {/* AI Banner */}
        <AiAssistantBanner />

        {/* Product listing */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px] font-medium text-gray-900">
              Recommended for you
            </h2>
          </div>
          <ProductContainer />
        </div>

        {/* Flash deals */}
        <FlashDealBanner />
      </main>
    </div>
  );
};

export default HomePage;
