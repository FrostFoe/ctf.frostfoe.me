import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitize(input: string): string {
  // A simple sanitizer that removes HTML tags.
  // For a real application, you should use a more robust library like DOMPurify.
  return input.replace(/<[^>]*>?/gm, '');
}
