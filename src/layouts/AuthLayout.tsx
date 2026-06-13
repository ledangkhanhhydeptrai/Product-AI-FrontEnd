// layouts/AuthLayout.tsx
import React from "react";

export interface ChildrenProps {
  children: React.ReactNode;
}
const AuthLayout: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default AuthLayout;
