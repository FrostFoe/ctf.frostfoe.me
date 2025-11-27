/**
 * Role-based access control components
 */

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/lib/context/user-context";

interface RoleGuardProps {
  requiredRole: "player" | "admin";
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Component to guard content based on user role
 */
export function RoleGuard({
  requiredRole,
  children,
  fallback,
}: RoleGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== requiredRole)) {
      router.push("/");
    }
  }, [user, requiredRole, isLoading, router]);

  if (isLoading) {
    return fallback || <div>লোড হচ্ছে...</div>;
  }

  if (!user || user.role !== requiredRole) {
    return fallback || null;
  }

  return children;
}

/**
 * Component to show content only to authenticated users
 */
export function AuthGuard({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return fallback || <div>লোড হচ্ছে...</div>;
  }

  if (!user) {
    return fallback || null;
  }

  return children;
}

/**
 * Component to show content only to admin users
 */
export function AdminGuard({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <RoleGuard requiredRole="admin" fallback={fallback}>
      {children}
    </RoleGuard>
  );
}
