"use client";

import React, { useState, useRef, useCallback } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImageURL } from "@/lib/image-utils";

interface ImageCropperProps {
  imageSrc: string;
  aspect?: number;
  onApply: (
    croppedURL: string,
    cropData: { x: number; y: number; width: number; height: number }
  ) => void;
  onCancel: () => void;
}

export default function ImageCropper({
  imageSrc,
  aspect,
  onApply,
  onCancel,
}: ImageCropperProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      imgRef.current = e.currentTarget;
      const { width, height } = e.currentTarget;
      const cropWidth = width * 0.8;
      const cropHeight = aspect ? cropWidth / aspect : height * 0.8;
      const x = (width - cropWidth) / 2;
      const y = (height - Math.min(cropHeight, height * 0.9)) / 2;

      const initialCrop: Crop = {
        unit: "px",
        x,
        y,
        width: cropWidth,
        height: Math.min(cropHeight, height * 0.9),
      };
      setCrop(initialCrop);
      setCompletedCrop(initialCrop as PixelCrop);
    },
    [aspect]
  );

  const handleApply = useCallback(() => {
    if (!imgRef.current || !completedCrop) return;
    const croppedURL = getCroppedImageURL(imgRef.current, {
      x: completedCrop.x,
      y: completedCrop.y,
      width: completedCrop.width,
      height: completedCrop.height,
      unit: "px",
    });
    onApply(croppedURL, {
      x: completedCrop.x,
      y: completedCrop.y,
      width: completedCrop.width,
      height: completedCrop.height,
    });
  }, [completedCrop, onApply]);

  const handleReset = useCallback(() => {
    if (!imgRef.current) return;
    const { width, height } = imgRef.current;
    const resetCrop: Crop = { unit: "px", x: 0, y: 0, width, height };
    setCrop(resetCrop);
    setCompletedCrop(resetCrop as PixelCrop);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Crop Image</h2>
            <p className="text-xs text-white/40 mt-0.5">
              Drag to select the area you want to keep
            </p>
          </div>
          <button
            onClick={handleReset}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 transition-all cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Crop Area */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-black/40 min-h-0">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            className="max-h-[60vh]"
          >
            <img
              src={imageSrc}
              alt="Crop preview"
              onLoad={onImageLoad}
              className="max-h-[60vh] max-w-full object-contain"
            />
          </ReactCrop>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white/80 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 cursor-pointer"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
}

