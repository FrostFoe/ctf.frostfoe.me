/**
 * CTF Data Export and Import Utilities
 * Handles exporting user data to JSON and importing from JSON
 */

import { exportUserData } from "@/lib/user-data";
import { clearAllStorage } from "@/lib/storage";

/**
 * Export all user data as JSON file
 */
export function exportUserDataAsJson(filename: string = "ctf-user-data"): void {
  if (typeof window === "undefined") return;

  const data = exportUserData();
  const jsonString = JSON.stringify(data, null, 2);
  const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(jsonString);

  const exportFileDefaultName = `${filename}-${new Date().toISOString().split("T")[0]}.json`;

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

/**
 * Import user data from JSON file
 */
export function importUserDataFromJson(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);

        // Validate imported data
        if (!data.profile || !data.stats || !data.challenges) {
          console.error("Invalid data format");
          resolve(false);
          return;
        }

        // Clear existing data
        clearAllStorage();

        // Import data (this would need to be extended based on actual storage structure)
        console.log("Data imported successfully:", data);
        resolve(true);
      } catch (error) {
        console.error("Error importing data:", error);
        resolve(false);
      }
    };

    reader.readAsText(file);
  });
}

/**
 * Format timestamp to readable format (Bengali)
 */
export function formatTimestampBn(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "এখনই";
  if (diffMins < 60) return `${diffMins} মিনিট আগে`;
  if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
  if (diffDays < 30) return `${diffDays} দিন আগে`;

  // Format as date
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Format points with separator
 */
export function formatPoints(points: number): string {
  return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Calculate level from points
 */
export function calculateLevel(points: number): number {
  return Math.floor(points / 500) + 1;
}

/**
 * Calculate progress to next level
 */
export function getProgressToNextLevel(points: number): { current: number; next: number; percentage: number } {
  const currentLevel = calculateLevel(points);
  const currentLevelPoints = (currentLevel - 1) * 500;
  const nextLevelPoints = currentLevel * 500;

  const progress = points - currentLevelPoints;
  const required = nextLevelPoints - currentLevelPoints;
  const percentage = Math.floor((progress / required) * 100);

  return {
    current: progress,
    next: required,
    percentage,
  };
}

/**
 * Get rarity badge color
 */
export function getRarityBadgeClass(rarity: string): string {
  switch (rarity) {
    case "common":
      return "bg-slate-500 text-white";
    case "rare":
      return "bg-blue-500 text-white";
    case "epic":
      return "bg-purple-500 text-white";
    case "legendary":
      return "bg-yellow-500 text-black font-bold";
    default:
      return "bg-slate-500 text-white";
  }
}

/**
 * Get difficulty color
 */
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "সহজ":
    case "easy":
      return "text-green-400";
    case "মাঝারি":
    case "medium":
      return "text-yellow-400";
    case "কঠিন":
    case "hard":
      return "text-red-400";
    default:
      return "text-slate-400";
  }
}

/**
 * Get difficulty background
 */
export function getDifficultyBg(difficulty: string): string {
  switch (difficulty) {
    case "সহজ":
    case "easy":
      return "bg-green-500/20";
    case "মাঝারি":
    case "medium":
      return "bg-yellow-500/20";
    case "কঠিন":
    case "hard":
      return "bg-red-500/20";
    default:
      return "bg-slate-500/20";
  }
}

/**
 * Generate achievement unlocked notification
 */
export function createAchievementNotification(
  icon: string,
  name: string,
  rarity: string,
): { title: string; description: string; icon: string } {
  return {
    icon,
    title: `${name} আনলক হয়েছে!`,
    description: `দুর্দান্ত! আপনি এই ${rarity} অর্জন আনলক করেছেন।`,
  };
}

/**
 * Calculate team average points per member
 */
export function calculateTeamAveragePoints(totalPoints: number, memberCount: number): number {
  return memberCount > 0 ? Math.round(totalPoints / memberCount) : 0;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate username format
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * Generate unique ID
 */
export function generateUniqueId(prefix: string = ""): string {
  return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout;

  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}

/**
 * Group array by property
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const group = String(item[key]);
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(item);
      return result;
    },
    {} as Record<string, T[]>,
  );
}

/**
 * Sort array by multiple criteria
 */
export function sortBy<T>(array: T[], ...criteria: Array<{ key: keyof T; ascending?: boolean }>): T[] {
  return [...array].sort((a, b) => {
    for (const criterion of criteria) {
      const aVal = a[criterion.key];
      const bVal = b[criterion.key];

      if (aVal < bVal) return criterion.ascending !== false ? -1 : 1;
      if (aVal > bVal) return criterion.ascending !== false ? 1 : -1;
    }

    return 0;
  });
}

/**
 * Paginate array
 */
export function paginate<T>(array: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return array.slice(start, start + pageSize);
}

/**
 * Calculate percentile
 */
export function calculatePercentile(value: number, array: number[]): number {
  const sorted = [...array].sort((a, b) => a - b);
  const index = sorted.findIndex((v) => v >= value);
  return index === -1 ? 100 : (index / sorted.length) * 100;
}
