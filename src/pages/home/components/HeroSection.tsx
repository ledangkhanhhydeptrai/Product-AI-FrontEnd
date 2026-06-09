import AiInsightStrip from "./AiInsightStrip";

const insights = [
  { label: "Perfect for you", value: "94%", sub: "match score" },
  { label: "Price drop alert", value: "12", sub: "items saved" },
  { label: "Trending now", value: "38", sub: "in your style" }
];

export default function HeroSection() {
  return (
    <section className="bg-[#1A1A2E]">
      {/* Hero content */}
      <AiInsightStrip insights={insights} />
    </section>
  );
}
