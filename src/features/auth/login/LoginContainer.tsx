import { useNavigate } from "react-router-dom";
import { loginRequest } from "../authSlice";
import LoginForm from "../components/LoginForm";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import React from "react";
import { UserRole } from "../authApi";

export default function LoginContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  console.log(isAuthenticated);
  const handleLogin = (email: string, password: string) => {
    dispatch(loginRequest({ email, password }));
  };

  // ✅ CHUYỂN TRANG Ở ĐÂY
  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === UserRole.ADMIN) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return <LoginForm onSubmit={handleLogin} loading={loading} error={error} />;
}
