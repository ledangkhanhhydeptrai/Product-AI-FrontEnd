import React from "react";
import {
  User,
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  Bot,
  Cpu,
  BrainCircuit,
  Sparkles,
  BarChart3,
  Package,
  Tag
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
      desc: "Gợi ý sản phẩm thông minh"
    },
    {
      icon: BarChart3,
      label: "Smart Analytics",
      desc: "Phân tích xu hướng real-time"
    },
    { icon: Package, label: "Auto Inventory", desc: "Quản lý kho tự động" },
    { icon: Tag, label: "Dynamic Pricing", desc: "Định giá thông minh" }
  ];

  return (
    <div className="min-h-screen flex bg-[#09090f]" onKeyPress={handleKeyPress}>
      {/* LEFT — AI Feature Panel */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-14">
        {/* Grid texture background */}
        <div className="absolute inset-0 opacity-[0.04]" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-125 h-125 rounded-full opacity-10 blur-[120px]" />
        <div className="absolute bottom-10 right-0 w-75 h-75 rounded-full opacity-10 blur-[100px]" />

        {/* Top — Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 rounded-xl border border-violet-500/30 bg-violet-950/60">
              <Bot className="w-6 h-6 text-violet-400" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#09090f]" />
            </div>
            <div>
              <p className="text-white font-bold text-lg tracking-tight leading-none">
                Product AI
              </p>
              <p className="text-violet-400/70 text-xs tracking-[0.15em] uppercase">
                Ecommerce Platform
              </p>
            </div>
          </div>
        </div>

        {/* Center — Headline + Feature Grid */}
        <div className="relative z-10 space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-950/60 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-violet-300 text-xs font-medium tracking-wide">
                Powered by Generative AI
              </span>
            </div>
            <h2 className="text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Bán hàng thông minh
              <br />
              <span className="text-transparent bg-clip-text">
                với trí tuệ nhân tạo
              </span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-md">
              Nền tảng thương mại điện tử được hỗ trợ bởi AI — tối ưu doanh thu,
              dự đoán hành vi khách hàng và tự động hóa vận hành.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            {capabilities.map((item, i) => (
              <div
                key={i}
                className="group relative p-5 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/6 hover:border-violet-500/20 transition-all duration-300 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10" />
                <item.icon className="w-5 h-5 text-violet-400 mb-3" />
                <p className="text-white text-sm font-semibold mb-1">
                  {item.label}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-8 pt-2 border-t border-white/5">
            {[
              ["50K+", "Sản phẩm AI"],
              ["98%", "Chính xác"],
              ["3x", "Tăng trưởng"]
            ].map(([val, label], i) => (
              <div key={i}>
                <p className="text-white text-2xl font-bold leading-none mb-1">
                  {val}
                </p>
                <p className="text-slate-500 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — Testimonial */}
        <div className="relative z-10 p-5 rounded-2xl border border-white/5 bg-white/2">
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            "Product AI đã giúp chúng tôi tăng 3x doanh thu trong 6 tháng nhờ hệ
            thống gợi ý sản phẩm tự động."
          </p>
        </div>
      </div>

      {/* RIGHT — Login Form */}
      <div className="w-full lg:w-[48%] flex items-center justify-center p-8 relative">
        {/* Subtle right-side glow */}
        <div className="absolute inset-0 opacity-5 blur-3xl pointer-events-none" />

        <div className="w-full max-w-100 relative z-10">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="p-2 rounded-xl border border-violet-500/30 bg-violet-950/60">
              <Bot className="w-5 h-5 text-violet-400" />
            </div>
            <span className="text-white font-bold text-lg">Product AI</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 bg-violet-950/50 border border-violet-500/20 rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Hệ thống đang hoạt động
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Đăng nhập
            </h1>
            <p className="text-slate-400 text-sm">
              Tiếp tục quản lý cửa hàng với AI
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-950/20">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                Email
              </label>
              <div className="relative">
                <User
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focusedField === "email" ? "text-violet-400" : "text-slate-600"}`}
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  disabled={loading}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/4 border text-white text-sm placeholder:text-slate-600 focus:outline-none transition-all duration-200 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                  Mật khẩu
                </label>
                <a
                  href="#"
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focusedField === "password" ? "text-violet-400" : "text-slate-600"}`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  disabled={loading}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/4 border text-white text-sm placeholder:text-slate-600 focus:outline-none transition-all duration-200 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors"
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
            <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${rememberMe ? "bg-violet-600 border-violet-600" : "bg-transparent border-slate-600"}`}
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
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                Ghi nhớ đăng nhập
              </span>
            </label>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !email || !password}
              className="w-full relative py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden group mt-2"
            >
              {/* Shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                    <Cpu className="w-4 h-4" />
                  </>
                )}
              </span>
            </button>

            {/* Divider */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-[#09090f] text-slate-600 text-xs">
                  hoặc
                </span>
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={() => router("/auth/register")}
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-white/7 hover:border-white/15 bg-white/2 hover:bg-white/5 transition-all duration-200 disabled:opacity-40"
            >
              Tạo tài khoản mới
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-700 text-xs mt-8">
            © 2025 Product AI Ecommerce. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
