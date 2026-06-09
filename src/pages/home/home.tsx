import Header, { NavbarProps } from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import AiAssistantBanner from "./components/AiAssistantBanner";
import ProductContainer from "../../features/product/productContainer/ProductContainer";
import FlashDealBanner from "./components/FlashDealBanner";
import AiInsightStrip from "./components/AiInsightStrip";
const categories = [
  { id: "electronics", name: "Electronics", icon: "⚡", count: "1.2k" },
  { id: "fashion", name: "Fashion", icon: "👗", count: "3.5k" },
  { id: "home", name: "Home & Living", icon: "🏡", count: "2.1k" }
];
const insights = [
  {
    label: "Perfect for you",
    value: "94%",
    sub: "match score"
  },
  {
    label: "Price drop alert",
    value: "12",
    sub: "items saved"
  },
  {
    label: "Trending now",
    value: "38",
    sub: "in your style"
  }
];
const HomePage: React.FC<NavbarProps> = ({ cartCount, onSearchSubmit }) => {
  return (
    <>
      <Header cartCount={cartCount} onSearchSubmit={onSearchSubmit} />

      <HeroSection />

      <AiInsightStrip insights={insights} />

      <CategorySection categories={categories} />

      <AiAssistantBanner />

      <ProductContainer />

      <FlashDealBanner />

      <Footer />
    </>
  );
};

export default HomePage;
