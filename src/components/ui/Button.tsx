type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md";
};

const variants = {
  primary: "bg-accent text-ink hover:bg-accent-dark",
  secondary: "bg-ink text-white hover:bg-black",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors whitespace-nowrap ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}