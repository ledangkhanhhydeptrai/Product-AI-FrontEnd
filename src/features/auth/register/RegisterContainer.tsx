import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

import RegisterForm from "../components/RegisterForm";
import { registerRequest } from "../authSlice";
import { useNavigate } from "react-router-dom";

const RegisterContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, registered } = useSelector(
    (state: RootState) => state.auth
  );
  React.useEffect(() => {
    if (registered) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [registered, navigate]);
  const handleRegister = (data: {
    fullname: string;
    email: string;
    password: string;
    phone: string;
    file: File | null;
  }) => {
    dispatch(
      registerRequest({
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        phone: data.phone,
        file: data.file // hoặc bỏ luôn cũng được
      })
    );
  };

  return (
    <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
  );
};

export default RegisterContainer;
