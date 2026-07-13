import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
