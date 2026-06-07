import React from "react";

export default function useLoginForm() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [formError, setFormError] = React.useState<string | null>(null);

  const validate = (): boolean => {
    if (!email.trim()) {
      setFormError("Email không được bỏ trống");
      return false;
    }

    // Validate format email cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Email không đúng định dạng");
      return false;
    }

    if (!password.trim()) {
      setFormError("Mật khẩu không được bỏ trống");
      return false;
    }

    if (password.length < 6) {
      setFormError("Mật khẩu tối thiểu 6 ký tự");
      return false;
    }

    setFormError(null);
    return true;
  };

  return {
    email,
    password,
    formError,
    setEmail,
    setPassword,
    setFormError,
    validate
  };
}
