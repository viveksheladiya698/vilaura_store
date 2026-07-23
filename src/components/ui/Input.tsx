type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
};

export function Input({ label, error, icon, id, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`w-full rounded-md border px-4 py-2.5 text-sm outline-none transition-colors focus:border-ink ${
            icon ? "pl-10" : ""
          } ${error ? "border-red-400" : "border-border"} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}