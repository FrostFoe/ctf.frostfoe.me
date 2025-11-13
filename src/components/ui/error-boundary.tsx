import React, { type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex items-center justify-center p-8 bg-red-950/20 border border-red-800/50 rounded-lg">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle className="w-12 h-12 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-red-300 mb-2">
                কিছু ভুল হয়েছে
              </h3>
              <p className="text-sm text-red-200">
                এই সেকশন লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে পৃষ্ঠা রিফ্রেশ
                করুন।
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
