import React from "react";
import {
  User,
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  Bot,
  BrainCircuit,
  Sparkles,
  BarChart3,
  Package,
  Tag,
  ArrowRight,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  onSubmit: (username: string, password: string) => void;
  loading: boolean;
  error: string | null;
}

export default function LoginForm({ onSubmit, loading, error }: Props) {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [rememberMe, setRememberMe] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  const router = useNavigate();

  const handleSubmit = () => {
    if (!email || !password) return;
    onSubmit(email, password);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const capabilities = [
    {
      icon: BrainCircuit,
      label: "AI Recommendations",
      desc: "Gợi ý sản phẩm thông minh",
      accent: "from-violet-500/10 to-violet-500/5",
      iconColor: "text-violet-400",
      border: "border-violet-500/10 hover:border-violet-500/25"
    },
    {
      icon: BarChart3,
      label: "Smart Analytics",
      desc: "Phân tích xu hướng real-time",
      accent: "from-emerald-500/10 to-emerald-500/5",
      iconColor: "text-emerald-400",
      border: "border-emerald-500/10 hover:border-emerald-500/25"
    },
    {
      icon: Package,
      label: "Auto Inventory",
      desc: "Quản lý kho tự động",
      accent: "from-sky-500/10 to-sky-500/5",
      iconColor: "text-sky-400",
      border: "border-sky-500/10 hover:border-sky-500/25"
    },
    {
      icon: Tag,
      label: "Dynamic Pricing",
      desc: "Định giá thông minh",
      accent: "from-amber-500/10 to-amber-500/5",
      iconColor: "text-amber-400",
      border: "border-amber-500/10 hover:border-amber-500/25"
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .input-field {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.2s;
        }
        .input-field:focus {
          background: rgba(139,92,246,0.07);
          border-color: rgba(139,92,246,0.45);
          box-shadow: 0 0 0 3px rgba(139,92,246,0.08);
          outline: none;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.2); }
        .card-feature {
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
        }
        .card-feature::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.25s;
          background: radial-gradient(circle at 30% 50%, rgba(139,92,246,0.08), transparent 70%);
        }
        .card-feature:hover::before { opacity: 1; }
        .submit-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%);
          box-shadow: 0 4px 20px rgba(109,40,217,0.35), inset 0 1px 0 rgba(255,255,255,0.12);
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .submit-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          animation: shimmer 2.5s infinite;
        }
        .submit-btn:hover {
          box-shadow: 0 6px 28px rgba(109,40,217,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
          transform: translateY(-1px);
        }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.5; transform: none; box-shadow: none; cursor: not-allowed; }
        @keyframes shimmer { to { left: 200%; } }
        .stat-item { border-left: 1px solid rgba(255,255,255,0.06); padding-left: 1.5rem; }
        .stat-item:first-child { border-left: none; padding-left: 0; }
        .glow-dot { box-shadow: 0 0 6px rgba(52,211,153,0.8); }
        .hero-gradient {
          background: linear-gradient(135deg, #fff 0%, #c4b5fd 50%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .noise-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }
        .tag-badge {
          background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(109,40,217,0.1));
          border: 1px solid rgba(139,92,246,0.2);
          backdrop-filter: blur(4px);
        }
        .register-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.2s;
        }
        .register-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.14);
        }
        .testimonial-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
        }
        .logo-box {
          background: linear-gradient(135deg, rgba(109,40,217,0.5), rgba(76,29,149,0.6));
          border: 1px solid rgba(139,92,246,0.3);
          box-shadow: 0 0 20px rgba(109,40,217,0.15), inset 0 1px 0 rgba(255,255,255,0.1);
        }
      `}</style>

      <div
        className="min-h-screen flex bg-[#07070e] text-white"
        onKeyPress={handleKeyPress}
      >
        {/* ── LEFT PANEL ── */}
        <div className="hidden lg:flex lg:w-[54%] relative overflow-hidden flex-col justify-between p-14">
          {/* Background layers */}
          <div className="noise-overlay" />

          {/* Ambient orbs */}
          <div className="absolute top-0 left-0 w-125 h-125 rounded-full opacity-[0.07] blur-[130px] bg-violet-600 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-87.5 h-87.5 rounded-full opacity-[0.06] blur-[100px] bg-indigo-500 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75 h-[75 rounded-full opacity-[0.04] blur-[80px] bg-purple-400 pointer-events-none" />

          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="logo-box p-2.5 rounded-xl">
                <Bot className="w-6 h-6 text-violet-300" />
              </div>
              <div>
                <p className="text-white font-semibold text-[17px] tracking-tight leading-none mb-0.5">
                  Product AI
                </p>
                <p className="text-violet-400/60 text-[11px] tracking-[0.18em] uppercase font-medium">
                  Ecommerce Platform
                </p>
              </div>
            </div>
          </div>

          {/* Center content */}
          <div className="relative z-10 space-y-10">
            {/* Badge */}
            <div>
              <div className="tag-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7">
                <Sparkles className="w-3.5 h-3.5 text-violet-300" />
                <span className="text-violet-200 text-[12px] font-medium tracking-wide">
                  Powered by Generative AI
                </span>
              </div>

              <h2 className="text-[46px] font-bold leading-[1.1] tracking-tight mb-5">
                <span className="hero-gradient">Bán hàng thông minh</span>
                <br />
                <span className="text-white/90">với trí tuệ nhân tạo</span>
              </h2>
              <p className="text-slate-400 text-[15px] leading-relaxed max-w-md">
                Nền tảng thương mại điện tử được hỗ trợ bởi AI — tối ưu doanh
                thu, dự đoán hành vi khách hàng và tự động hóa vận hành.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-3">
              {capabilities.map((item, i) => (
                <div
                  key={i}
                  className={`card-feature p-5 rounded-2xl border bg-linear-to-br ${item.accent} ${item.border} cursor-default`}
                >
                  <div className={`mb-3 ${item.iconColor}`}>
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <p className="text-white text-[13px] font-semibold mb-1 leading-snug">
                    {item.label}
                  </p>
                  <p className="text-white/35 text-[12px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-0 pt-3 border-t border-white/5">
              {[
                ["50K+", "Sản phẩm AI"],
                ["98%", "Chính xác"],
                ["3x", "Tăng trưởng"]
              ].map(([val, label], i) => (
                <div key={i} className="stat-item">
                  <p className="text-white text-[22px] font-bold leading-none mb-1 tracking-tight">
                    {val}
                  </p>
                  <p className="text-white/35 text-[12px] font-medium">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative z-10">
            <div className="testimonial-card p-5 rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-purple-700 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                  TN
                </div>
                <div>
                  <p className="text-white/50 text-[13px] leading-relaxed mb-2">
                    "Product AI đã giúp chúng tôi tăng{" "}
                    <span className="text-violet-300 font-semibold">
                      3x doanh thu
                    </span>{" "}
                    trong 6 tháng nhờ hệ thống gợi ý sản phẩm tự động."
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/30 text-[11px] font-medium">
                      Trần Ngọc
                    </span>
                    <span className="text-white/15 text-[11px]">·</span>
                    <span className="text-white/25 text-[11px]">
                      CEO, ShopVN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="w-full lg:w-[46%] flex items-center justify-center p-8 relative border-l border-white/4">
          {/* Right panel ambient */}
          <div className="absolute top-0 right-0 w-62.5 h-62.5 rounded-full opacity-[0.05] blur-[80px] bg-violet-500 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-50 h-50 rounded-full opacity-[0.04] blur-[60px] bg-indigo-600 pointer-events-none" />

          <div className="w-full max-w-100 relative z-10">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2.5 mb-8">
              <div className="logo-box p-2 rounded-xl">
                <Bot className="w-5 h-5 text-violet-300" />
              </div>
              <span className="text-white font-semibold text-[17px]">
                Product AI
              </span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 rounded-full px-3 py-1 mb-5">
                <span className="glow-dot w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Hệ thống đang hoạt động
              </div>
              <h1 className="text-[32px] font-bold text-white mb-2 tracking-tight leading-none">
                Đăng nhập
              </h1>
              <p className="text-white/35 text-[14px]">
                Tiếp tục quản lý cửa hàng với AI
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-950/25">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-300 text-[13px] leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">
                  Email
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      focusedField === "email"
                        ? "text-violet-400"
                        : "text-white/20"
                    }`}
                  />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    disabled={loading}
                    placeholder="you@example.com"
                    className="input-field w-full pl-10 pr-4 py-3 rounded-xl text-white text-[14px] disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">
                    Mật khẩu
                  </label>
                  <a
                    href="#"
                    className="text-[12px] text-violet-400/70 hover:text-violet-300 transition-colors"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <Lock
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      focusedField === "password"
                        ? "text-violet-400"
                        : "text-white/20"
                    }`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    disabled={loading}
                    placeholder="••••••••"
                    className="input-field w-full pl-10 pr-12 py-3 rounded-xl text-white text-[14px] disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors p-0.5"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-2.5 cursor-pointer group w-fit pt-0.5">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-200 ${
                      rememberMe
                        ? "bg-violet-600 border border-violet-500"
                        : "bg-transparent border border-white/15 group-hover:border-white/25"
                    }`}
                  >
                    {rememberMe && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[13px] text-white/35 group-hover:text-white/55 transition-colors">
                  Ghi nhớ đăng nhập
                </span>
              </label>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading || !email || !password}
                className="submit-btn w-full py-3.5 rounded-xl text-[14px] font-semibold text-white mt-2"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Đang xác thực...
                    </>
                  ) : (
                    <>
                      Đăng nhập
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </span>
              </button>

              {/* Security note */}
              <div className="flex items-center justify-center gap-1.5 py-0.5">
                <Shield className="w-3 h-3 text-white/20" />
                <span className="text-[11px] text-white/20">
                  Kết nối được mã hoá SSL 256-bit
                </span>
              </div>

              {/* Divider */}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/6" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-[#07070e] text-white/20 text-[12px]">
                    hoặc
                  </span>
                </div>
              </div>

              {/* Register */}
              <button
                onClick={() => router("/register")}
                disabled={loading}
                className="register-btn w-full py-3.5 rounded-xl text-[13px] font-medium text-white/45 hover:text-white/70 transition-all duration-200 disabled:opacity-40"
              >
                Tạo tài khoản mới
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-white/15 text-[11px] mt-8">
              © 2025 Product AI Ecommerce. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
