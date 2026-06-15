import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

import type { RootState } from "../../app/store";
import { NavbarProps } from "../../components/Header";

import HeroSection from "./components/HeroSection";
import CategoryContainer from "../../features/categories/categoryContainer/CategoryContainer";
import AiAssistantBanner from "./components/AiAssistantBanner";
import FlashDealBanner from "./components/FlashDealBanner";
import ProductContainer from "../../features/product/productContainer/ProductContainer";
import BrandContainer from "../../features/brands/brandContainer/brandContainer";

const insights = [
  { label: "Perfect for you", value: "94%", sub: "match score" },
  { label: "Price drop alert", value: "12", sub: "items saved" },
  { label: "Trending now", value: "38", sub: "in your style" }
];

const HomePage: React.FC<NavbarProps> = () => {
  const categories = useSelector((state: RootState) => state.category.data);
  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <main className="flex flex-col gap-9">
        {/* Hero */}
        <HeroSection insights={insights} />

        {/* Categories */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <CategoryContainer />
          {/* Category Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Categories</p>

                <h2 className="text-3xl font-bold text-gray-900">
                  {categories.length}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 max-w-xl justify-end">
                {categories.slice(0, 6).map((category) => (
                  <span
                    key={category.id}
                    className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Brands */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <BrandContainer />
        </div>
        {/* AI Banner */}
        <AiAssistantBanner />

        {/* Products */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px] font-medium text-gray-900">
              Recommended for you
            </h2>

            <Link
              to="/productAll"
              className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <ProductContainer />
        </div>

        {/* Flash Deals */}
        <FlashDealBanner />
      </main>
    </div>
  );
};

export default HomePage;
