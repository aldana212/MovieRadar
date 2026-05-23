import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}

const buttonVariants = {
  primary:
    "w-full flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 text-sm",

  secondary:
    "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 bg-[#3B82F6]/90 text-white border border-white/20 disabled:bg-transparent disabled:border-[#1E293B] hover:bg-[#3B82F6]",

  ghost:
    "w-full flex items-center justify-center gap-[8px] p-2.5 bg-[#0F172A] rounded-[12px] border border-[#1E293B] transition-all text-gray-400 hover:text-red-400",
};

const CustomButton = ({
  label,
  icon,
  loading = false,
  variant = "primary",
  type = "button",
  className = "",
  children,
  disabled,
  ...rest
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${buttonVariants[variant]} ${className}`}
      {...rest}
    >
      {loading ? (
       <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {icon && icon}
          {label && <span>{label}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default CustomButton;