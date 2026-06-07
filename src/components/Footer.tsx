import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A2E] text-slate-500 px-10 py-8 text-center text-sm">
      <div className="flex items-center justify-center gap-1.5 mb-2.5">
        <span className="font-playfair text-white text-lg font-bold">Aura</span>
        <span className="font-playfair text-lg font-bold bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          AI
        </span>
      </div>
      <p>© 2025 AuraAI Commerce · Built with AI-powered intelligence ✦</p>
    </footer>
  );
};

export default Footer;
