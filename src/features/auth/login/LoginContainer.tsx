import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import type { RootState } from "../../../app/store";
import { loginRequest } from "../authSlice";
import type { UserRole } from "../authApi";

export default function LoginContainer() {
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // ✅ SAFE: chỉ lấy role khi user tồn tại
  const role: UserRole | null = user;

  useAuthRedirect({
    isLoggedIn: isAuthenticated,
    redirectIfNotLoggedIn: "/login",
    role
  });

  const handleLogin = (email: string, password: string) => {
    dispatch(loginRequest({ email, password }));
  };

  return <LoginForm onSubmit={handleLogin} loading={loading} error={error} />;
}
