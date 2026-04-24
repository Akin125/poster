"use client";

import React, { useRef, useEffect, useState } from "react";
import { PosterPreset, PosterState } from "@/lib/types";
import { renderPoster } from "@/lib/canvas-renderer";
import { PREVIEW_SCALE } from "@/lib/constants";

interface PosterPreviewProps {
  state: PosterState;
  preset: PosterPreset;
}

export default function PosterPreview({ state, preset }: PosterPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState(false);
  const renderIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const currentId = ++renderIdRef.current;
    setRendering(true);

    renderPoster(canvas, state, preset, PREVIEW_SCALE)
      .then(() => {
        if (currentId === renderIdRef.current) {
          setRendering(false);
        }
      })
      .catch(() => {
        if (currentId === renderIdRef.current) {
          setRendering(false);
        }
      });
  }, [
    state.mainImage.objectURL,
    state.mainImage.croppedURL,
    state.floatingImages[0].objectURL,
    state.floatingImages[0].croppedURL,
    state.floatingImages[1].objectURL,
    state.floatingImages[1].croppedURL,
    state.floatingImages[2].objectURL,
    state.floatingImages[2].croppedURL,
    state.nameFields.surname,
    state.nameFields.firstName,
    state.nameFields.otherName,
    state.background,
    state.mainGrayscale,
    preset,
  ]);

  const hasAnyImage =
    state.mainImage.objectURL ||
    state.floatingImages.some((f) => f.objectURL);

  return (
    <div className="relative w-full flex items-center justify-center">
      {!hasAnyImage ? (
        <div className="w-full aspect-[3000/3500] max-w-[500px] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 bg-white/[0.02]">
          <div className="text-6xl opacity-20">🖼</div>
          <div className="text-center">
            <p className="text-white/30 text-sm font-medium">
              Your poster preview
            </p>
            <p className="text-white/15 text-xs mt-1">
              Upload images to see the live preview
            </p>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-[500px]">
          <canvas
            ref={canvasRef}
            className="w-full h-auto rounded-2xl shadow-2xl shadow-black/50"
            style={{ aspectRatio: "3000 / 3500" }}
          />
          {rendering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl backdrop-blur-[2px]">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 text-white/70 text-xs">
                <div className="w-3 h-3 border-2 border-white/30 border-t-purple-400 rounded-full animate-spin" />
                Rendering...
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

