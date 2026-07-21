export function IconButton({
  children,
  badge,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { badge?: number }) {
  return (
    <button
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-cream transition-colors"
      {...props}
    >
      {children}
      {typeof badge === "number" && badge > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-ink">
          {badge}
        </span>
      )}
    </button>
  );
}