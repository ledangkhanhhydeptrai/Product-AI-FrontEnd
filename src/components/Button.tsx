import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"
  | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:border-emerald-700",
  secondary:
    "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-gray-300",
  ghost:
    "bg-transparent text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-800",
  outline:
    "bg-transparent text-emerald-700 border-emerald-500 hover:bg-emerald-50",
  danger: "bg-red-700 text-white border-red-700 hover:bg-red-800",
  success: "bg-green-700 text-white border-green-700 hover:bg-green-800"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-4.5 py-2.5 text-sm rounded-[10px] gap-2",
  lg: "px-6 py-3 text-[15px] rounded-xl gap-2"
};

const Spinner: React.FC<{ light?: boolean }> = ({ light = true }) => (
  <span
    className={`inline-block w-3.5 h-3.5 rounded-full border-2 animate-spin shrink-0 ${
      light
        ? "border-white/30 border-t-white"
        : "border-gray-200 border-t-gray-500"
    }`}
    aria-hidden="true"
  />
);

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  children,
  disabled,
  className = "",
  ...props
}) => {
  const isDisabled = disabled || loading;
  const lightSpinner =
    variant === "primary" || variant === "danger" || variant === "success";

  return (
    <button
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center font-medium border transition-all duration-150",
        "active:scale-[0.97] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
        sizeStyles[size],
        isDisabled
          ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed opacity-60"
          : variantStyles[variant],
        loading ? "cursor-wait opacity-75" : "",
        className
      ].join(" ")}
      {...props}
    >
      {loading ? (
        <Spinner light={lightSpinner} />
      ) : (
        icon &&
        iconPosition === "left" && <span className="shrink-0">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
};

export default Button;
