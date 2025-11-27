"use client";

import type { ReactNode } from "react";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

type StateType = "idle" | "loading" | "success" | "error";

interface StateIndicatorProps {
  state: StateType;
  message?: string;
  children?: ReactNode;
  className?: string;
}

const stateConfig: Record<
  StateType,
  { icon: ReactNode; bgColor: string; textColor: string; borderColor: string }
> = {
  idle: {
    icon: null,
    bgColor: "bg-slate-800/30",
    textColor: "text-slate-300",
    borderColor: "border-slate-700",
  },
  loading: {
    icon: <Loader className="w-5 h-5 animate-spin" />,
    bgColor: "bg-blue-900/20",
    textColor: "text-blue-300",
    borderColor: "border-blue-700/30",
  },
  success: {
    icon: <CheckCircle className="w-5 h-5" />,
    bgColor: "bg-lime-900/20",
    textColor: "text-lime-300",
    borderColor: "border-lime-700/30",
  },
  error: {
    icon: <AlertCircle className="w-5 h-5" />,
    bgColor: "bg-red-900/20",
    textColor: "text-red-300",
    borderColor: "border-red-700/30",
  },
};

export function StateIndicator({
  state,
  message,
  children,
  className = "",
}: StateIndicatorProps) {
  const config = stateConfig[state];

  return (
    <div
      className={`${config.bgColor} border ${config.borderColor} rounded-lg p-4 ${config.textColor} ${className}`}
      role="status"
      aria-live="polite"
      aria-label={`State: ${state}. ${message ?? ""}`}
    >
      <div className="flex items-center gap-3">
        {config.icon && <div className="shrink-0">{config.icon}</div>}
        <div className="flex-1">
          {message && <p className="font-medium text-sm">{message}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

interface StateWrapperProps {
  state: StateType;
  loadingMessage?: string;
  errorMessage?: string;
  successMessage?: string;
  children: ReactNode;
  className?: string;
}

export function StateWrapper({
  state,
  loadingMessage = "লোড হচ্ছে...",
  errorMessage = "কিছু ভুল হয়েছে",
  successMessage = "সফলভাবে সম্পন্ন হয়েছে",
  children,
  className = "",
}: StateWrapperProps) {
  switch (state) {
    case "loading":
      return (
        <StateIndicator
          state="loading"
          message={loadingMessage}
          className={className}
        />
      );
    case "error":
      return (
        <StateIndicator
          state="error"
          message={errorMessage}
          className={className}
        />
      );
    case "success":
      return (
        <StateIndicator
          state="success"
          message={successMessage}
          className={className}
        />
      );
    default:
      return <div className={className}>{children}</div>;
  }
}
