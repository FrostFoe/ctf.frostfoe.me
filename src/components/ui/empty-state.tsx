import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-label={title}
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      <div className="text-slate-600 mb-4">
        {icon ?? <Inbox className="w-12 h-12" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">{title}</h3>
      {description && (
        <p className="text-slate-400 text-center mb-6 max-w-md">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
