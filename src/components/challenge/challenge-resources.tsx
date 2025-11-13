/**
 * Challenge Resources Component
 * Displays downloadable resources with tracking
 */

"use client";

import { useState } from "react";
import {
  Download,
  FileText,
  FileArchive,
  Image,
  File,
  CheckCircle,
} from "lucide-react";
import { useChallengeSubmission } from "@/hooks/use-challenge-submission";

interface ChallengeResource {
  name: string;
  url: string;
  type: "pdf" | "zip" | "image" | "document" | "other";
  size: number; // in bytes
  description?: string;
}

interface ChallengeResourcesProps {
  challengeId: number;
  resources: ChallengeResource[];
}

const FILE_ICONS = {
  pdf: FileText,
  zip: FileArchive,
  image: Image,
  document: FileText,
  other: File,
};

export function ChallengeResources({
  challengeId,
  resources,
}: ChallengeResourcesProps) {
  const { downloadResource } = useChallengeSubmission(challengeId, 1);
  const [downloadedItems, setDownloadedItems] = useState<Set<string>>(
    new Set(),
  );
  const [downloadingItem, setDownloadingItem] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleDownload = async (resource: ChallengeResource) => {
    setDownloadingItem(resource.name);

    try {
      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Track the download
      downloadResource(resource.name, resource.size);

      // Mark as downloaded
      setDownloadedItems((prev) => new Set([...prev, resource.name]));

      // In a real app, you would trigger actual download here:
      // const link = document.createElement('a');
      // link.href = resource.url;
      // link.download = resource.name;
      // link.click();

      // Simulate download completion
      setTimeout(() => {
        setDownloadingItem(null);
      }, 500);
    } catch (error) {
      console.error("Download error:", error);
      setDownloadingItem(null);
    }
  };

  if (resources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
        <FileArchive className="w-5 h-5 text-blue-400" />
        চ্যালেঞ্জ রিসোর্স
      </h3>

      <div className="grid gap-3">
        {resources.map((resource) => {
          const IconComponent = FILE_ICONS[resource.type];
          const isDownloaded = downloadedItems.has(resource.name);
          const isDownloading = downloadingItem === resource.name;

          return (
            <div
              key={resource.name}
              className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-all group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-200">{resource.name}</p>
                    {isDownloaded && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  {resource.description && (
                    <p className="text-sm text-gray-400 mt-0.5">
                      {resource.description}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-mono text-gray-500">
                    {formatFileSize(resource.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDownload(resource)}
                disabled={isDownloading}
                className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2 flex-shrink-0"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-300 rounded-full animate-spin" />
                    ডাউনলোড...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    ডাউনলোড
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800 text-blue-200 text-sm">
        <p>
          💡 সকল রিসোর্স স্থানীয়ভাবে সংরক্ষিত থাকে এবং আপনার ডাউনলোড অগ্রগতি
          ট্র্যাক করা হয়।
        </p>
      </div>
    </div>
  );
}
