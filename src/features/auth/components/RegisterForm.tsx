import React from "react";
import { User, Lock, Mail, Phone, Eye, EyeOff, Bot } from "lucide-react";
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

export default function RegisterForm({ onSubmit, loading, error }: Props) {
  const router = useNavigate();

  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const fileRef = React.useRef<File | null>(null);

  const [showPassword, setShowPassword] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState<string | null>(null);

  // =====================
  // VALIDATE (BE RULES)
  // =====================
  const validate = () => {
    if (!fullname.trim()) return "Full name is required";
    if (!file) {
      return "File is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";

    if (password.length < 6) return "Password must be at least 6 characters";

    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!phoneRegex.test(phone)) return "Invalid phone number";

    return null;
  };

  const handleSubmit = () => {
    const actualFile = fileRef.current;

    console.log("FILE:", actualFile);
    console.log("STATE FILE:", file);
    console.log("REF FILE:", fileRef.current);
    const err = validate();
    if (err) return alert(err);

    onSubmit({
      fullname,
      email,
      password,
      phone,
      file: actualFile
    });
  };

  const inputClass = (field: string) =>
    `w-full pl-10 p-3 rounded-xl border transition-all text-white bg-white/5
    ${
      focusedField === field
        ? "border-violet-500 bg-white/10"
        : "border-white/10"
    }`;

  const iconClass = (field: string) =>
    `absolute left-3 top-3 w-4 h-4 transition-colors ${
      focusedField === field ? "text-violet-400" : "text-slate-500"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090f] p-6">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-violet-950/60 border border-violet-500/30">
              <Bot className="w-5 h-5 text-violet-400" />
            </div>
            <span className="text-white font-bold">Product AI</span>
          </div>

          <h1 className="text-3xl font-bold text-white">Đăng ký</h1>
          <p className="text-slate-400 text-sm">Tạo tài khoản mới</p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/30 border border-red-500/20 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <div className="space-y-4">
          {/* FULL NAME */}
          <div>
            <label className="text-xs text-slate-400 uppercase">
              Full Name
            </label>
            <div className="relative mt-1">
              <User className={iconClass("name")} />
              <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className={inputClass("name")}
                placeholder="Nguyễn Văn A"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs text-slate-400 uppercase">Email</label>
            <div className="relative mt-1">
              <Mail className={iconClass("email")} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={inputClass("email")}
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="text-xs text-slate-400 uppercase">Phone</label>
            <div className="relative mt-1">
              <Phone className={iconClass("phone")} />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                className={inputClass("phone")}
                placeholder="098xxxxxxx"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs text-slate-400 uppercase">Password</label>
            <div className="relative mt-1">
              <Lock className={iconClass("password")} />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-10 p-3 rounded-xl border text-white bg-white/5 transition-all border-white/10"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* FILE */}
          <div>
            <label className="text-xs text-slate-400 uppercase">Avatar</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0] || null;
                setFile(f);
                fileRef.current = f;
              }}
              placeholder="Input a image"
            />
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500 transition disabled:opacity-50"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-slate-500 text-sm">
            Đã có tài khoản?{" "}
            <span
              onClick={() => router("/auth/login")}
              className="text-violet-400 cursor-pointer"
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
