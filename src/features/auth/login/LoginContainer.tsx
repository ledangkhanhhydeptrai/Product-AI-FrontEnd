import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../authSlice";
import LoginForm from "../components/LoginForm";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

export default function LoginContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  console.log(isAuthenticated);
  const handleLogin = (email: string, password: string) => {
    dispatch(loginRequest({ email, password }));
  };

  // ✅ CHUYỂN TRANG Ở ĐÂY
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return <LoginForm onSubmit={handleLogin} loading={loading} error={error} />;
}
