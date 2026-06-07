// features/auth/hooks/useAuthRedirect.ts

import React from "react";
import { UserRole } from "../authApi";
import { useNavigate } from "react-router-dom";

interface AuthRedirectOptions {
  isLoggedIn: boolean;
  role: UserRole | null;
  redirectIfNotLoggedIn: string;
}

export function useAuthRedirect({
  isLoggedIn,
  role,
  redirectIfNotLoggedIn = "/login"
}: AuthRedirectOptions) {
  const router = useNavigate();

  React.useEffect(() => {
    // ❌ Chưa đăng nhập → về login
    if (!isLoggedIn) {
      router(redirectIfNotLoggedIn);
      return;
    }

    // ⛔ Đã login nhưng CHƯA có role → CHỜ
    if (!role) return;

    // ✅ Có role → redirect đúng
    if (role === UserRole.ADMIN) {
      router("/admin");
    } else {
      router("/");
    }
  }, [isLoggedIn, role, redirectIfNotLoggedIn, router]);
}
