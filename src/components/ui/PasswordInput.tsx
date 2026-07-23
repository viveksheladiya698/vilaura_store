"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function PasswordInput({ label, error, id, className = "", ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <div className="relative">
        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          id={id}
          type={visible ? "text" : "password"}
          className={`w-full rounded-md border px-10 py-2.5 text-sm outline-none transition-colors focus:border-ink ${
            error ? "border-red-400" : "border-border"
          } ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ink"
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}