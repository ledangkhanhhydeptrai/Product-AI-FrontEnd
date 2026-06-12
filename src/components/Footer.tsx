import React from "react";
import {
  Zap,
  Sparkles,
  ShieldCheck,
  Star,
  TrendingUp,
  Gift,
  Tag,
  HelpCircle,
  RefreshCw,
  MapPin,
  Mail,
  Users,
  Briefcase,
  Newspaper,
  Lock
} from "lucide-react";
import { FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E1B4B] rounded-2xl px-9 pt-10 pb-6">
      {/* Top grid */}
      <div className="grid grid-cols-4 gap-8 pb-7 border-b border-white/[0.07] mb-5">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-[9px] bg-indigo-400/20 border border-indigo-400/25 flex items-center justify-center">
              <Zap size={15} className="text-indigo-300" />
            </div>
            <span className="text-[18px] font-medium text-indigo-100 tracking-tight">
              Aura<span className="text-indigo-400">AI</span>
            </span>
          </div>
          <p className="text-[12px] text-slate-400/55 leading-relaxed max-w-50 mb-4">
            AI-powered shopping that learns your style and finds what you love —
            faster.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/[0.07] rounded-lg px-2.5 py-1.5 text-[11px] text-indigo-300/60">
              <Sparkles size={12} className="text-indigo-400" /> AI-curated
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/[0.07] rounded-lg px-2.5 py-1.5 text-[11px] text-indigo-300/60">
              <ShieldCheck size={12} className="text-indigo-400" /> Secure
              checkout
            </span>
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-indigo-300/50 mb-3.5">
            Shop
          </p>
          <ul className="flex flex-col gap-2.5">
            {[
              { icon: <Star size={13} />, label: "New arrivals" },
              { icon: <TrendingUp size={13} />, label: "Best sellers" },
              { icon: <Zap size={13} />, label: "Flash deals" },
              { icon: <Tag size={13} />, label: "Sale" },
              { icon: <Gift size={13} />, label: "Gift cards" }
            ].map(({ icon, label }) => (
              <li key={label}>
                <a
                  href="#"
                  className="flex items-center gap-2 text-[13px] text-slate-400/60 hover:text-indigo-100 transition-colors"
                >
                  <span className="opacity-60">{icon}</span> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-indigo-300/50 mb-3.5">
            Support
          </p>
          <ul className="flex flex-col gap-2.5">
            {[
              { icon: <HelpCircle size={13} />, label: "Help center" },
              { icon: <RefreshCw size={13} />, label: "Returns" },
              { icon: <MapPin size={13} />, label: "Track order" },
              { icon: <Mail size={13} />, label: "Contact us" }
            ].map(({ icon, label }) => (
              <li key={label}>
                <a
                  href="#"
                  className="flex items-center gap-2 text-[13px] text-slate-400/60 hover:text-indigo-100 transition-colors"
                >
                  <span className="opacity-60">{icon}</span> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-indigo-300/50 mb-3.5">
            Company
          </p>
          <ul className="flex flex-col gap-2.5">
            {[
              { icon: <Users size={13} />, label: "About us" },
              { icon: <Briefcase size={13} />, label: "Careers" },
              { icon: <Newspaper size={13} />, label: "Blog" },
              { icon: <Lock size={13} />, label: "Privacy" }
            ].map(({ icon, label }) => (
              <li key={label}>
                <a
                  href="#"
                  className="flex items-center gap-2 text-[13px] text-slate-400/60 hover:text-indigo-100 transition-colors"
                >
                  <span className="opacity-60">{icon}</span> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <span className="text-[12px] text-slate-400/35">
          © 2025 AuraAI Commerce ·{" "}
          <span className="text-indigo-400/40">
            Built with AI-powered intelligence
          </span>
        </span>

        <div className="flex items-center gap-3">
          {/* Payment methods */}
          <div className="flex items-center gap-2">
            {["VISA", "MC", "PAYPAL", "APPLE PAY"].map((p) => (
              <span
                key={p}
                className="bg-white/5 border border-white/7 rounded-md px-2 py-1 text-[10px] font-medium tracking-wide text-indigo-300/50"
              >
                {p}
              </span>
            ))}
          </div>

          <div className="w-px h-3.5 bg-white/8" />

          {/* Social */}
          <div className="flex gap-2">
            {[
              <FaInstagram size={14} />,
              <FaGithub size={14} />,
              <FaYoutube size={14} />
            ].map((icon, i) => (
              <button
                key={i}
                className="w-8 h-8 rounded-[9px] bg-white/5 border border-white/[0.07] flex items-center justify-center text-indigo-300/70 hover:bg-indigo-400/20 hover:border-indigo-400/30 hover:text-indigo-300 transition-all"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
