"use client";

import React, { useState } from "react";
import { PosterPreset, PosterState } from "@/lib/types";
import { exportPoster } from "@/lib/canvas-renderer";
import { CANVAS_H, CANVAS_W } from "@/lib/constants";

interface ExportButtonProps {
  state: PosterState;
  preset: PosterPreset;
  disabled?: boolean;
}

function sanitizeFilenamePart(value: string): string {
  return value
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "")
    .replace(/-+/g, "-")
    .replace(/^[-_. ]+|[-_. ]+$/g, "");
}

function buildExportName(state: PosterState, preset: PosterPreset): string {
  const nameParts = [state.nameFields.surname, state.nameFields.firstName, state.nameFields.otherName]
    .map(sanitizeFilenamePart)
    .filter(Boolean);

  if (nameParts.length === 0) {
    return preset.exportFilePrefix;
  }

  return `${preset.exportFilePrefix}-${nameParts.join("-")}`;
}

export default function ExportButton({ state, preset, disabled }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState("");
  const exportWidth = preset.canvasWidth ?? CANVAS_W;
  const exportHeight = preset.canvasHeight ?? CANVAS_H;

  const handleExport = async () => {
    if (exporting || disabled) return;

    setExporting(true);
    setProgress("Compositing layers...");

    try {
      const blob = await exportPoster(state, preset);
      setProgress("Preparing download...");

      const url = URL.createObjectURL(blob);
      const exportName = buildExportName(state, preset);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${exportName}.png`;
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
            <span>⬇</span> Download Poster ({exportWidth}x{exportHeight})
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

