import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showPasswordToggle?: boolean;
}

export default function TextField({
  className,
  id,
  label,
  showPasswordToggle = false,
  type,
  ...inputProps
}: TextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const canTogglePassword = showPasswordToggle && type === "password";
  const inputType = canTogglePassword && isPasswordVisible ? "text" : type;

  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="auth-input-wrapper">
        <input
          id={id}
          type={inputType}
          {...inputProps}
          className={`auth-input${canTogglePassword ? " auth-input-password" : ""}${className ? ` ${className}` : ""}`}
        />

        {canTogglePassword && (
          <button
            className="auth-password-toggle"
            type="button"
            aria-controls={id}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            aria-pressed={isPasswordVisible}
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
          >
            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
