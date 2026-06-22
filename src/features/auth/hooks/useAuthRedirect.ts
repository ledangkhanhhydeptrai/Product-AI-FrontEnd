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
    console.log("🚀 useAuthRedirect RUN");

    console.log("isLoggedIn =", isLoggedIn);
    console.log("role =", role);
    console.log("redirectIfNotLoggedIn =", redirectIfNotLoggedIn);

    if (!isLoggedIn) {
      console.log("➡ redirect login");
      router(redirectIfNotLoggedIn);
      return;
    }

    if (!role) {
      console.log("⏳ waiting role...");
      return;
    }

    if (role === UserRole.ADMIN) {
      console.log("🔥 GO ADMIN");
      router("/admin");
    } else {
      console.log("🏠 GO HOME");
      router("/");
    }
  }, [isLoggedIn, role, redirectIfNotLoggedIn, router]);
}
