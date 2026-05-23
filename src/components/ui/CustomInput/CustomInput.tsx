import { Eye, EyeOff } from "lucide-react";
import {
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  classNameInput?: string;
}

const CustomInput = ({
  type = "text",
  name = "custom",
  label,
  icon,
  classNameInput= "bg-gray-800 border border-gray-700",
  disabled = false,
  ...rest
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className={`w-full h-auto flex flex-col items-start ${
        label ? "gap-[8px]" : ""
      }`}
    >
      {label && (
        <label
          htmlFor={name}
          className="sm:text-[12px] text-[11px] text-gray-400 sm:leading-[20px] leading-[16px] font-medium"
        >
          {label}
        </label>
      )}

      <label
        htmlFor={name}
        className={`relative w-full sm:h-[44px] h-[40px] ${classNameInput}  transition-all ${
          !disabled && "hover:border-[#0066FF]"
        } flex justify-start items-center gap-[8px] py-[12px] pl-[7px] pr-[12px] rounded-xl cursor-pointer transition-all duration-300`}
      >
        {icon && icon}

        <input
          type={showPassword ? "text" : type}
          name={name}
          id={name}
          disabled={disabled}
          {...rest}
          className="
            w-full
            outline-none
            text-[16px]
            scale-[0.75]
            sm:scale-100
            origin-left
            text-white
            placeholder-gray-600
          "
        />

        {type === "password" &&
          (showPassword ? (
            <EyeOff
              className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-300 transition-colors"
              onClick={handleChangePassword}
            />
          ) : (
            <Eye
              className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-300 transition-colors"
              onClick={handleChangePassword}
            />
          ))}
      </label>
    </div>
  );
};

export default CustomInput;
