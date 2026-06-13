import React from "react";
import {
  User,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Bot,
  Brain,
  ShieldCheck,
  Zap,
  Code2,
  ArrowRight,
  Check,
  Image
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  onSubmit: (data: {
    fullname: string;
    email: string;
    password: string;
    phone: string;
    file: File | null;
  }) => void;
  loading: boolean;
  error: string | null;
}

const FEATURES = [
  {
    icon: <Brain size={15} />,
    colorClass: "bg-purple-900/20 text-purple-400",
    name: "AI thông minh",
    desc: "Phân tích & tạo nội dung tức thì"
  },
  {
    icon: <ShieldCheck size={15} />,
    colorClass: "bg-teal-900/20 text-teal-400",
    name: "Bảo mật tuyệt đối",
    desc: "Mã hoá đầu cuối, không lưu dữ liệu"
  },
  {
    icon: <Zap size={15} />,
    colorClass: "bg-pink-900/20 text-pink-400",
    name: "Phản hồi tốc độ cao",
    desc: "Latency dưới 200ms mọi lúc"
  },
  {
    icon: <Code2 size={15} />,
    colorClass: "bg-amber-900/20 text-amber-400",
    name: "API tích hợp dễ dàng",
    desc: "REST & SDK cho mọi nền tảng"
  }
];

const AVATARS = [
  { initials: "NV", bg: "bg-[#534AB7]" },
  { initials: "TH", bg: "bg-[#1D9E75]" },
  { initials: "LM", bg: "bg-[#D4537E]" },
  { initials: "PQ", bg: "bg-[#BA7517]" }
];

function getStrengthScore(password: string): number {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function getStrengthColor(score: number): string {
  if (score <= 1) return "bg-red-500";
  if (score <= 2) return "bg-amber-400";
  return "bg-teal-500";
}

export default function RegisterForm({ onSubmit, loading, error }: Props) {
  const router = useNavigate();

  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const fileRef = React.useRef<File | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState<string | null>(null);

  const strengthScore = getStrengthScore(password);
  const strengthBarColor = getStrengthColor(strengthScore);

  const validate = () => {
    if (!fullname.trim()) return "Họ và tên là bắt buộc";
    if (!fileRef.current) return "Ảnh đại diện là bắt buộc";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email không hợp lệ";
    if (password.length < 6) return "Mật khẩu tối thiểu 6 ký tự";
    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!phoneRegex.test(phone)) return "Số điện thoại không hợp lệ";
    return null;
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) return alert(err);
    onSubmit({ fullname, email, password, phone, file: fileRef.current });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    fileRef.current = f;
    if (f) setPreviewUrl(URL.createObjectURL(f));
    else setPreviewUrl(null);
  };

  // Dynamic input classes based on focus state
  const inputClass = (field: string) =>
    [
      "rg-inp w-full py-2 pl-8 pr-3 text-[13px] text-[#e8e4ff] rounded-[9px]",
      "outline-none transition-all duration-150 font-[Plus_Jakarta_Sans]",
      "border-[0.5px]",
      focusedField === field
        ? "bg-[#534AB7]/[0.09] border-[#7F77DD]/55"
        : "bg-white/[0.04] border-white/[0.08]"
    ].join(" ");

  const iconColor = (field: string) =>
    focusedField === field ? "text-[#7F77DD]" : "text-white/[0.22]";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        .rg-inp::placeholder { color: rgba(255,255,255,0.18) !important; font-size: 12.5px; }
        .soc-btn:hover { border-color: rgba(255,255,255,0.18) !important; background: rgba(255,255,255,0.06) !important; color: rgba(255,255,255,0.8) !important; }
        .sub-btn:hover { background: #7F77DD !important; }
        .sub-btn:active { transform: scale(0.985); }
        .upload-zone:hover { border-color: rgba(127,119,221,0.55) !important; background: rgba(83,74,183,0.1) !important; }
        @keyframes shimmer { to { left: 200%; } }
        .shimmer { position: absolute; top: 0; left: -100%; width: 55%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); animation: shimmer 2.8s infinite; }
        .foot-link { color: #9F9AE0; text-decoration: none; font-weight: 500; }
        .foot-link:hover { color: #AFA9EC; }
      `}</style>

      <div className="flex min-h-screen bg-[#0c0a1e]">
        {/* ── LEFT PANEL ── */}
        <div className="w-70 min-w-70 bg-[#12102a] px-7 py-8 flex flex-col relative overflow-hidden border-r border-white/5">
          {/* Decorative orbs */}
          <div className="absolute -top-20 -left-20 w-55 h-55 rounded-full bg-[#534AB7]/18 pointer-events-none" />
          <div className="absolute bottom-10 -right-15 w-40 h-40 rounded-full bg-[#1D9E75]/12 pointer-events-none" />
          <div className="absolute top-[42%] left-7.5 w-22.5 h-22.5 rounded-full bg-[#D4537E]/14 pointer-events-none" />

          {/* Brand */}
          <div className="flex items-center gap-2.25 mb-8 relative">
            <div className="w-8.5 h-8.5 rounded-[10px] bg-[#534AB7] flex items-center justify-center text-[#CECBF6]">
              <Bot size={17} />
            </div>
            <span className="text-[14px] font-semibold text-[#e2dff8] tracking-[-0.01em]">
              Product AI
            </span>
          </div>

          {/* Hero text */}
          <div className="relative mb-7">
            <div className="text-[10.5px] font-semibold tracking-widest text-[#7F77DD] uppercase mb-2.5 flex items-center gap-1.5">
              <span className="w-4.5 h-px bg-[#534AB7] inline-block" />
              Nền tảng AI
            </div>
            <h2 className="text-[26px] text-[#f0eeff] font-normal leading-[1.2] mb-2">
              Khám phá
              <br />
              <em className="italic text-[#AFA9EC]">thế giới AI</em>
              <br />
              của bạn
            </h2>
            <p className="text-[12px] text-white/30 leading-relaxed">
              Tham gia cùng hàng nghìn người dùng đang tận dụng sức mạnh trí tuệ
              nhân tạo mỗi ngày.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2.5">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div
                  className={`w-7.5 h-7.5 min-w-7.5 rounded-lg flex items-center justify-center ${f.colorClass}`}
                >
                  {f.icon}
                </div>
                <div>
                  <div className="text-[12.5px] font-medium text-white/75 mb-px">
                    {f.name}
                  </div>
                  <div className="text-[11px] text-white/[0.28] leading-relaxed">
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-auto pt-6">
            <div className="flex items-center mb-2">
              {AVATARS.map((av, i) => (
                <div
                  key={i}
                  className={`w-6.5 h-6.5 rounded-full border-[1.5px] border-[#12102a] -mr-2 ${av.bg} flex items-center justify-center text-[10px] font-semibold text-[#EEEDFE]`}
                >
                  {av.initials}
                </div>
              ))}
              <span className="text-[11px] text-white/[0.28] ml-4">
                <strong className="text-white/55 font-medium">+2.4k</strong>{" "}
                người dùng
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#FAC775] text-[12px] tracking-wider">
                ★★★★★
              </span>
              <span className="text-[11px] text-white/[0.28]">
                4.9 · Đánh giá xuất sắc
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 px-10 py-8 flex flex-col relative overflow-hidden">
          {/* Decorative orb */}
          <div className="absolute -top-7.5 -right-7.5 w-50 h-50 rounded-full bg-[#534AB7]/8 pointer-events-none" />

          {/* Header */}
          <div className="mb-6">
            <div className="text-[20px] font-semibold text-[#f0eeff] tracking-[-0.02em] mb-1">
              Tạo tài khoản
            </div>
            <div className="text-[12px] text-white/30">
              Điền thông tin bên dưới để bắt đầu miễn phí
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-3.5 px-3.5 py-2.5 rounded-[9px] bg-red-500/10 border border-red-500/25 text-[#F09595] text-[13px]">
              {error}
            </div>
          )}

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[{ label: "Google" }, { label: "GitHub" }].map((s) => (
              <button
                key={s.label}
                type="button"
                className="soc-btn flex items-center justify-center gap-1.5 py-2 rounded-[9px] border border-white/9 bg-white/3 cursor-pointer text-[12px] text-white/50 transition-all duration-150"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[10.5px] text-white/20 tracking-wider">
              hoặc dùng email
            </span>
            <span className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-2.75">
            {/* Full name */}
            <div className="flex flex-col gap-1">
              <label className="text-[10.5px] font-semibold tracking-[0.07em] uppercase text-white/35">
                Họ và tên
              </label>
              <div className="relative">
                <input
                  className={inputClass("name")}
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Nguyễn Văn A"
                />
                <User
                  size={14}
                  className={`absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-150 ${iconColor("name")}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-[10.5px] font-semibold tracking-[0.07em] uppercase text-white/35">
                Email
              </label>
              <div className="relative">
                <input
                  className={inputClass("email")}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                />
                <Mail
                  size={14}
                  className={`absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-150 ${iconColor("email")}`}
                />
              </div>
            </div>

            {/* Phone + Password row */}
            <div className="grid grid-cols-2 gap-2.25">
              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] font-semibold tracking-[0.07em] uppercase text-white/35">
                  Điện thoại
                </label>
                <div className="relative">
                  <input
                    className={inputClass("phone")}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="098xxxxxxx"
                  />
                  <Phone
                    size={14}
                    className={`absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-150 ${iconColor("phone")}`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] font-semibold tracking-[0.07em] uppercase text-white/35">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    className={`${inputClass("password")} pr-8`}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                  />
                  <Lock
                    size={14}
                    className={`absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-150 ${iconColor("password")}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-white/22 flex items-center p-0"
                    aria-label="Hiện mật khẩu"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                {/* Strength bars */}
                {password.length > 0 && (
                  <div className="flex gap-0.75 mt-0.75">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className={`flex-1 h-0.5 rounded-sm transition-all duration-200 ${
                          n <= strengthScore
                            ? strengthBarColor
                            : "bg-white/[0.07]"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* File upload */}
            <div className="flex flex-col gap-1">
              <label className="text-[10.5px] font-semibold tracking-[0.07em] uppercase text-white/35">
                Ảnh đại diện
              </label>
              <label
                className={`upload-zone rounded-[9px] p-[11px_12px] flex items-center gap-2.5 cursor-pointer transition-all duration-150 border-[0.5px] ${
                  file
                    ? "border-teal-500/50 bg-teal-900/6"
                    : "border-dashed border-[#7F77DD]/30 bg-[#534AB7]/5"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  className={`w-8.5 h-8.5 min-w-8.5 rounded-lg flex items-center justify-center overflow-hidden ${
                    file
                      ? "bg-teal-500/15 text-teal-400"
                      : "bg-[#534AB7]/18 text-[#7F77DD]"
                  }`}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="w-full h-full object-cover rounded-[7px]"
                    />
                  ) : (
                    <Image size={16} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] text-white/65 font-medium mb-px">
                    {file
                      ? file.name.length > 22
                        ? file.name.slice(0, 19) + "…"
                        : file.name
                      : "Tải ảnh lên"}
                  </div>
                  <div className="text-[11px] text-white/22">
                    {file
                      ? `${(file.size / 1024).toFixed(0)} KB`
                      : "PNG, JPG, WebP · tối đa 5MB"}
                  </div>
                </div>
                {file && (
                  <span className="text-[10px] font-semibold text-teal-400 bg-teal-900/[0.14] border border-teal-500/22 px-1.75 py-0.5 rounded-full flex items-center gap-0.75 whitespace-nowrap">
                    <Check size={10} /> Xong
                  </span>
                )}
              </label>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="sub-btn w-full py-2.75 rounded-[9px] bg-[#534AB7] border-none text-[#EEEDFE] text-[13.5px] font-semibold flex items-center justify-center gap-1.75 tracking-[-0.01em] relative overflow-hidden mt-0.5 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={loading}
            >
              <div className="shimmer" />
              <ArrowRight size={15} />
              {loading ? "Đang đăng ký..." : "Đăng ký ngay"}
            </button>
          </div>

          <div className="text-center text-[12px] text-white/22 mt-3.5">
            Đã có tài khoản?{" "}
            <a
              className="foot-link cursor-pointer"
              onClick={() => router("/login")}
            >
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
