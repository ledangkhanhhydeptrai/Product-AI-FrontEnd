import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


// ============================================================
// 🔌 API INTEGRATION POINTS — types để replace bằng data thật
// ============================================================

/** TODO: fetch từ GET /api/products?recommended=true&userId={id} */
interface Product {
  id: number;
  name: string;
  /** TODO: map từ category.name của API */
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  /** TODO: replace bằng product.imageUrl từ API */
  emoji: string;
  /** TODO: replace bằng product.thumbnailBg (hex) từ API */
  thumbBg: string;
}

/** TODO: fetch từ GET /api/categories */
interface Category {
  /** TODO: category.id từ API — dùng làm filter param */
  id: string;
  name: string;
  icon: string;
  /** TODO: category.productCount từ API */
  count: string;
}

/** TODO: fetch từ GET /api/ai-insights?userId={id} */
interface AiInsight {
  label: string;
  value: string;
  sub: string;
}

// ============================================================
// 📦 MOCK DATA — xoá và thay bằng API call khi ráp vô
// ============================================================

/** 🛒 PRODUCTS — replace bằng: const [products, setProducts] = useState<Product[]>([])
 *  useEffect(() => { fetch('/api/products').then(...).then(setProducts) }, []) */
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Smart Noise-Cancelling Headphones",
    category: "Electronics",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 2341,
    badge: "AI Pick",
    emoji: "🎧",
    thumbBg: "#E8F4FD"
  },
  {
    id: 2,
    name: "Ergonomic Mesh Office Chair",
    category: "Furniture",
    price: 459,
    originalPrice: 599,
    rating: 4.7,
    reviews: 1872,
    badge: "Trending",
    emoji: "🪑",
    thumbBg: "#EDF7ED"
  },
  {
    id: 3,
    name: "Minimalist Leather Watch",
    category: "Fashion",
    price: 189,
    originalPrice: 249,
    rating: 4.9,
    reviews: 987,
    badge: "AI Pick",
    emoji: "⌚",
    thumbBg: "#FEF3E2"
  },
  {
    id: 4,
    name: "Portable Espresso Maker",
    category: "Kitchen",
    price: 79,
    originalPrice: 110,
    rating: 4.6,
    reviews: 3210,
    badge: "Flash Deal",
    emoji: "☕",
    thumbBg: "#FDE8E8"
  }
];

/** 🗂️ CATEGORIES — replace bằng: const [categories, setCategories] = useState<Category[]>([])
 *  useEffect(() => { fetch('/api/categories').then(...).then(setCategories) }, []) */
const MOCK_CATEGORIES: Category[] = [
  { id: "electronics", name: "Electronics", icon: "⚡", count: "1.2k" },
  { id: "fashion", name: "Fashion", icon: "👗", count: "3.5k" },
  { id: "home", name: "Home & Living", icon: "🏡", count: "2.1k" },
  { id: "kitchen", name: "Kitchen", icon: "🍳", count: "890" },
  { id: "sports", name: "Sports", icon: "🏋️", count: "1.4k" },
  { id: "beauty", name: "Beauty", icon: "✨", count: "2.8k" }
];

/** 🤖 AI INSIGHTS — replace bằng: fetch('/api/ai-insights?userId=...') */
const MOCK_AI_INSIGHTS: AiInsight[] = [
  { label: "Perfect for you", value: "94%", sub: "match score" },
  { label: "Price drop alert", value: "12", sub: "items saved" },
  { label: "Trending now", value: "38", sub: "in your style" }
];

// ============================================================
// 🧩 SUB-COMPONENTS
// ============================================================

const StarRating: React.FC<{ rating: number }> = ({ rating }) =>
  <span className="text-amber-400 text-xs tracking-wide">
    {"★".repeat(Math.floor(rating))}
    {"☆".repeat(5 - Math.floor(rating))}
    <span className="text-gray-400 ml-1">
      {rating}
    </span>
  </span>;

const badgeStyle = (badge: string) => {
  if (badge === "AI Pick") return "bg-indigo-50 text-indigo-700";
  if (badge === "Flash Deal") return "bg-red-50 text-red-600";
  return "bg-green-50 text-green-700";
};

// ============================================================
// 🏠 HOME PAGE
// ============================================================

const HomePage: React.FC = () => {
  /** TODO: khi đổi category → GET /api/products?categoryId={activeCategoryId} */
  const [activeCategory, setActiveCategory] = useState("all");

  const [cartCount, setCartCount] = useState(2);
  /** TODO: khi Add to Cart → POST /api/cart { productId, quantity: 1 } */

  const [wishlist, setWishlist] = useState<number[]>([]);
  /** TODO: toggle wishlist → POST/DELETE /api/wishlist/:productId */

  // -- dùng mock data, sau này thay bằng state từ API --
  const products = MOCK_PRODUCTS;
  const categories = MOCK_CATEGORIES;
  const aiInsights = MOCK_AI_INSIGHTS;

  const toggleWishlist = (id: number) =>
    setWishlist(
      prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    );

  return (
    <div className="font-sans bg-[#F8F7F4] min-h-screen text-[#1A1A2E]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        body { font-family: 'Sora', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.45s ease forwards; }
        .delay-1 { animation-delay: 0.05s; opacity: 0; }
        .delay-2 { animation-delay: 0.12s; opacity: 0; }
        .delay-3 { animation-delay: 0.19s; opacity: 0; }
        .delay-4 { animation-delay: 0.26s; opacity: 0; }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <Header
        cartCount={cartCount}
        onSearchSubmit={value => {
          /** TODO: GET /api/products?q={value} */
          console.log("Search:", value);
        }}
      />

      {/* ── HERO BANNER ─────────────────────────────────────── */}
      <div className="bg-linear-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] px-10 pt-14 pb-12 relative overflow-hidden">
        {/* Decorative rings */}
        {[
          "absolute -top-16 right-20 w-72 h-72 rounded-full border border-white/10",
          "absolute top-5 right-72 w-36 h-36 rounded-full border border-white/5",
          "absolute -bottom-10 left-48 w-52 h-52 rounded-full border border-white/5"
        ].map((cls, i) => <div key={i} className={cls} />)}

        <div className="max-w-275 mx-auto relative z-10">
          <span className="inline-flex items-center bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide mb-4">
            ✦ AI-Powered Shopping
          </span>

          <h1 className="font-playfair font-bold text-[clamp(32px,4vw,52px)] text-white leading-tight mb-4 max-w-145">
            Shop Smarter with{" "}
            <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </h1>

          <p className="text-slate-400 text-base leading-relaxed max-w-110 mb-7">
            Personalized recommendations, smart price tracking, and curated
            picks — all powered by AI, tailored to you.
          </p>

          <div className="flex gap-3 flex-wrap">
            {/* TODO: onClick → navigate to /ai-picks */}
            <button className="bg-linear-to-br from-indigo-500 to-violet-500 text-white rounded-[14px] px-7 py-3 text-sm font-semibold hover:opacity-90 transition-opacity">
              Explore AI Picks →
            </button>
            {/* TODO: onClick → navigate to /deals */}
            <button className="bg-transparent text-slate-200 border border-white/20 rounded-[14px] px-7 py-3 text-sm font-medium hover:border-white/50 transition-colors">
              Browse Deals
            </button>
          </div>
        </div>

        {/* 🤖 AI INSIGHTS STRIP — TODO: replace MOCK_AI_INSIGHTS với GET /api/ai-insights?userId={id} */}
        <div className="max-w-275 mx-auto mt-10 grid grid-cols-3 gap-3 relative z-10">
          {aiInsights.map((item, i) =>
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 backdrop-blur-sm"
            >
              <p className="text-slate-400 text-xs mb-1">
                {item.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-indigo-300 text-[26px] font-bold font-sans">
                  {item.value}
                </span>
                <span className="text-slate-500 text-xs">
                  {item.sub}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div className="px-6 py-10 pb-16">
        {/* ── CATEGORIES ─────────────────────────────────────── */}
        {/* TODO: categories từ GET /api/categories — mỗi item có id, name, icon, productCount */}
        <section className="mb-11">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#1A1A2E]">
              Browse Categories
            </h2>
            {/* TODO: onClick → navigate to /categories */}
            <button className="text-indigo-500 text-sm font-semibold bg-transparent border-none cursor-pointer hover:text-indigo-700">
              View all →
            </button>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-hide">
            {/* "All" pill — reset filter */}
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 border rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${activeCategory ===
              "all"
                ? "bg-[#1A1A2E] text-white border-[#1A1A2E]"
                : "bg-white text-gray-600 border-gray-200 hover:bg-[#1A1A2E] hover:text-white hover:border-[#1A1A2E]"}`}
            >
              All
            </button>

            {/* TODO: categories.map — thay MOCK_CATEGORIES bằng state từ API */}
            {categories.map(cat =>
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                /* TODO: onClick → GET /api/products?categoryId={cat.id} */
                className={`shrink-0 border rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${activeCategory ===
                cat.id
                  ? "bg-[#1A1A2E] text-white border-[#1A1A2E]"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-[#1A1A2E] hover:text-white hover:border-[#1A1A2E]"}`}
              >
                {cat.icon} {cat.name}
                <span className="ml-1.5 text-[11px] opacity-50">
                  {cat.count}
                </span>
              </button>
            )}
          </div>
        </section>

        {/* ── AI ASSISTANT BANNER ──────────────────────────────── */}
        {/* TODO: message text từ GET /api/ai-insights/message?userId={id} */}
        <section className="bg-linear-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl px-7 py-6 mb-11 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-2xl">🤖</span>
              <span className="text-base font-semibold text-indigo-700">
                Your AI Shopping Assistant
              </span>
            </div>
            <p className="text-indigo-500 text-sm leading-relaxed">
              "Based on your browsing, you might love these picks. 3 items
              dropped in price today!"
            </p>
          </div>
          {/* TODO: onClick → navigate to /ai-picks hoặc mở AI chat sidebar */}
          <button className="bg-indigo-700 text-white rounded-xl px-5 py-2.5 text-sm font-semibold whitespace-nowrap hover:bg-indigo-800 transition-colors">
            ✦ See My Picks
          </button>
        </section>

        {/* ── PRODUCT GRID ──────────────────────────────────────── */}
        {/* TODO: products từ GET /api/products?recommended=true&userId={id}&categoryId={activeCategory}
                  loading state → hiển thị skeleton cards
                  empty state → hiển thị "No products found"  */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-[#1A1A2E]">
              Recommended for You
            </h2>
            <div className="flex gap-2">
              {/* TODO: sort buttons → thêm param sort=newest|price_asc|rating vào API call */}
              {["Newest", "Price ↑", "Rating"].map(f =>
                <button
                  key={f}
                  className="bg-white border border-gray-200 rounded-lg px-3.5 py-1.5 text-xs text-gray-500 font-medium hover:border-indigo-300 transition-colors"
                >
                  {f}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
            {/* TODO: thay products bằng data từ API */}
            {products.map((product, idx) =>
              <div
                key={product.id}
                /* TODO: onClick → navigate to /products/{product.id} */
                className={`bg-white rounded-[20px] overflow-hidden border border-gray-100 transition-all duration-250 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer fade-up delay-${idx +
                  1}`}
              >
                {/* Thumbnail — TODO: thay bằng <img src={product.imageUrl} /> từ API */}
                <div className="h-45 flex items-center justify-center text-[64px] relative">
                  {product.emoji}

                  {/* Badge — TODO: product.badge từ API (enum: "AI Pick" | "Trending" | "Flash Deal" | "New") */}
                  <span
                    className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full tracking-tight ${badgeStyle(
                      product.badge
                    )}`}
                  >
                    {product.badge === "AI Pick" ? "✦ " : ""}
                    {product.badge}
                  </span>

                  {/* Wishlist — TODO: trạng thái từ GET /api/wishlist, toggle → POST/DELETE /api/wishlist/{product.id} */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 bg-white rounded-full w-8 h-8 flex items-center justify-center text-base shadow-md hover:scale-110 transition-transform border-none"
                  >
                    {wishlist.includes(product.id) ? "❤️" : "🤍"}
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  {/* TODO: product.category.name từ API */}
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-[0.8px] mb-1">
                    {product.category}
                  </p>

                  {/* TODO: product.name từ API */}
                  <h3 className="text-sm font-semibold text-[#1A1A2E] leading-snug mb-2">
                    {product.name}
                  </h3>

                  {/* TODO: product.rating, product.reviewCount từ API */}
                  <StarRating rating={product.rating} />
                  <p className="text-[11px] text-gray-400 mt-0.5 mb-3">
                    {product.reviews.toLocaleString()} reviews
                  </p>

                  {/* Pricing — TODO: product.price, product.originalPrice từ API */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-[#1A1A2E]">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="bg-red-50 text-red-600 text-[11px] font-semibold px-1.5 py-0.5 rounded-md">
                      -
                      {Math.round(
                        (product.originalPrice - product.price) /
                          product.originalPrice *
                          100
                      )}
                      %
                    </span>
                  </div>

                  {/* TODO: onClick → POST /api/cart { productId: product.id, quantity: 1 } */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setCartCount(c => c + 1);
                    }}
                    className="w-full bg-[#1A1A2E] text-white rounded-xl py-2.5 text-sm font-medium hover:bg-[#2D2D4E] active:scale-[0.98] transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── FLASH DEALS BANNER ──────────────────────────────── */}
        {/* TODO: countdown từ GET /api/deals/flash → deal.endsAt (ISO date) */}
        <section className="mt-14 bg-linear-to-br from-[#1E1B4B] to-[#312E81] rounded-3xl px-9 py-8 flex items-center justify-between gap-5 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⚡</span>
              <span className="bg-yellow-300/20 text-yellow-300 border border-yellow-300/30 rounded-full px-3 py-0.5 text-xs font-semibold">
                Flash Deals · Ends in 02:47:33{" "}
                {/* TODO: real countdown từ deal.endsAt */}
              </span>
            </div>
            <h2 className="font-playfair text-white text-2xl font-bold mb-2">
              Up to 60% Off Today Only
            </h2>
            <p className="text-indigo-300 text-sm leading-relaxed">
              AI-detected deals hand-picked across your favourite categories.
            </p>
          </div>
          {/* TODO: onClick → navigate to /deals/flash */}
          <button className="bg-yellow-300 text-[#1E1B4B] rounded-[14px] px-8 py-3.5 text-sm font-bold whitespace-nowrap hover:scale-[1.03] transition-transform">
            Shop Flash Deals →
          </button>
        </section>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <Footer />
    </div>
  );
};

export default HomePage;
