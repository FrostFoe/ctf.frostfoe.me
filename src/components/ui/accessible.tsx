import type { ReactNode } from "react";

interface AccessibleCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  role?: string;
}

export function AccessibleCard({
  title,
  description,
  children,
  className = "",
  role = "region",
}: AccessibleCardProps) {
  return (
    <div
      role={role}
      aria-label={title}
      aria-describedby={description ? `desc-${title}` : undefined}
      className={className}
    >
      {description && (
        <p id={`desc-${title}`} className="sr-only">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

interface AccessibleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function AccessibleButton({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  className = "",
  type = "button",
}: AccessibleButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className={`focus:outline-hidden focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded transition-all ${className}`}
    >
      {children}
    </button>
  );
}

interface AccessibleBadgeProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function AccessibleBadge({
  children,
  className = "",
  ariaLabel,
}: AccessibleBadgeProps) {
  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${className}`}
    >
      {children}
    </span>
  );
}
