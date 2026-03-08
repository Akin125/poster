"use client";

import React, { useState } from "react";
import { PosterState } from "@/lib/types";
import { exportPoster } from "@/lib/canvas-renderer";

interface ExportButtonProps {
  state: PosterState;
  disabled?: boolean;
}

export default function ExportButton({ state, disabled }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState("");

  const handleExport = async () => {
    if (exporting || disabled) return;

    setExporting(true);
    setProgress("Compositing layers...");

    try {
      const blob = await exportPoster(state);
      setProgress("Preparing download...");

      const url = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, "");
      const a = document.createElement("a");
      a.href = url;
      a.download = `custom-poster-${timestamp}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setProgress("Done!");
      setTimeout(() => setProgress(""), 2000);
    } catch (err) {
      console.error("Export failed:", err);
      setProgress("Export failed. Please try again.");
      setTimeout(() => setProgress(""), 3000);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleExport}
        disabled={exporting || disabled}
        className={`w-full py-3.5 px-6 rounded-xl text-sm font-semibold tracking-wide uppercase
                    transition-all duration-300 cursor-pointer
                    ${
                      exporting || disabled
                        ? "bg-white/5 text-white/30 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
      >
        {exporting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Exporting...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>⬇</span> Download Poster (3000×3500)
          </span>
        )}
      </button>
      {progress && (
        <p className="text-xs text-center text-white/40 animate-pulse">
          {progress}
        </p>
      )}
    </div>
  );
}

