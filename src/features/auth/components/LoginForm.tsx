import React from "react";
import {
  User,
  Lock,
  Phone,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Zap,
  Star,
  TrendingUp,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Props interface
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
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const features = [
    { icon: Shield, text: "Bảo mật tuyệt đối", color: "text-blue-400" },
    { icon: Zap, text: "Trải nghiệm mượt mà", color: "text-yellow-400" },
    { icon: Star, text: "Chất lượng 5 sao", color: "text-purple-400" },
    { icon: Award, text: "Uy tín hàng đầu", color: "text-green-400" }
  ];

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-linear-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-60"></div>
                <div className="relative bg-linear-to-br from-indigo-600 to-purple-600 p-3 rounded-2xl">
                  <Phone className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Phone Sale
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Chào mừng trở lại! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Đăng nhập để tiếp tục hành trình của bạn
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3 animate-slideDown">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5" onKeyPress={handleKeyPress}>
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Mail đăng nhập <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <User
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "username"
                      ? "text-indigo-600"
                      : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-gray-900 font-medium ${
                    error
                      ? "border-red-300 focus:border-red-500"
                      : focusedField === "email"
                        ? "border-indigo-500 shadow-lg shadow-indigo-100"
                        : "border-gray-200"
                  } hover:border-indigo-300 bg-white`}
                  placeholder="Nhập tên đăng nhập"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "password"
                      ? "text-indigo-600"
                      : "text-gray-400"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-gray-900 font-medium ${
                    error
                      ? "border-red-300 focus:border-red-500"
                      : focusedField === "password"
                        ? "border-indigo-500 shadow-lg shadow-indigo-100"
                        : "border-gray-200"
                  } hover:border-indigo-300 bg-white`}
                  placeholder="Nhập mật khẩu"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  disabled={loading}
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                  Ghi nhớ đăng nhập
                </span>
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !email || !password}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  "Đăng nhập ngay →"
                )}
              </span>
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500 font-medium">
                  Hoặc
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <button
              onClick={() => router("/auth/register")}
              disabled={loading}
              className="w-full bg-white border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 font-semibold py-3.5 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Đăng ký tài khoản mới ✨
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-8">
            © 2025 Phone Sale. All rights reserved.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Illustration & Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          {/* Main Illustration */}
          <div className="mb-12 relative">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
                <Phone className="w-32 h-32 text-white animate-float" />
                <Sparkles className="absolute top-4 right-4 w-8 h-8 text-yellow-300 animate-pulse" />
                <TrendingUp className="absolute bottom-4 left-4 w-8 h-8 text-green-300 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold mb-4 text-center">
            Trải nghiệm mua sắm <br />
            thế hệ mới
          </h2>
          <p className="text-xl text-white/90 mb-12 text-center max-w-md">
            Khám phá hàng nghìn sản phẩm chính hãng với giá tốt nhất thị trường
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group animate-slideUp"
              >
                <feature.icon
                  className={`w-10 h-10 ${feature.color} mb-3 group-hover:scale-110 transition-transform`}
                />
                <p className="font-semibold text-lg">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-xl">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-white/80 text-sm">Người dùng</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5K+</div>
              <div className="text-white/80 text-sm">Sản phẩm</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-white/80 text-sm">Hài lòng</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
