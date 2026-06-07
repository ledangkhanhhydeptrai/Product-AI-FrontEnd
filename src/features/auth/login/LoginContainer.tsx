import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store";
import { loginRequest } from "../authSlice";
import LoginForm from "../components/LoginForm";

export default function LoginContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
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
