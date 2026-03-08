"use client";

import React, { useCallback, useRef, useState } from "react";
import { ACCEPTED_EXTENSIONS, ACCEPTED_IMAGE_TYPES } from "@/lib/constants";

interface ImageUploaderProps {
  label: string;
  sublabel?: string;
  imageURL: string | null;
  onUpload: (file: File, objectURL: string) => void;
  onRemove: () => void;
  onCrop: () => void;
  isGrayscale?: boolean;
  aspectHint?: string;
}

export default function ImageUploader({
  label,
  sublabel,
  imageURL,
  onUpload,
  onRemove,
  onCrop,
  isGrayscale = false,
  aspectHint,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        alert("Please upload a JPG, PNG, or WebP image.");
        return;
      }
      const url = URL.createObjectURL(file);
      onUpload(file, url);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold text-white/90 tracking-wide uppercase">
            {label}
          </h3>
          {sublabel && (
            <p className="text-xs text-white/40 mt-0.5">{sublabel}</p>
          )}
        </div>
        {imageURL && (
          <div className="flex gap-1.5">
            <button
              onClick={onCrop}
              className="text-xs px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300
                         hover:bg-purple-500/30 transition-all duration-200 cursor-pointer"
            >
              ✂ Crop
            </button>
            <button
              onClick={() => {
                onRemove();
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-red-500/20 text-red-300
                         hover:bg-red-500/30 transition-all duration-200 cursor-pointer"
            >
              ✕ Remove
            </button>
          </div>
        )}
      </div>

      {imageURL ? (
        <div
          className="relative rounded-xl overflow-hidden border border-white/10
                      bg-black/30 cursor-pointer group/img"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <img
            src={imageURL}
            alt={label}
            className={`w-full h-32 object-cover transition-all duration-300 
                       group-hover/img:opacity-80 ${
                         isGrayscale ? "grayscale" : ""
                       }`}
          />
          {isGrayscale && (
            <div className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full
                            bg-black/60 text-white/70 backdrop-blur-sm">
              B&W
            </div>
          )}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0
                        group-hover/img:opacity-100 transition-opacity bg-black/40"
          >
            <span className="text-white/80 text-sm font-medium">
              Click to replace
            </span>
          </div>
          {isDragOver && (
            <div className="absolute inset-0 bg-purple-500/20 border-2 border-dashed border-purple-400
                            flex items-center justify-center rounded-xl">
              <span className="text-purple-200 text-sm">Drop to replace</span>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer
                      flex flex-col items-center justify-center h-32 
                      ${
                        isDragOver
                          ? "border-purple-400 bg-purple-500/10"
                          : "border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
                      }`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <div className="text-3xl mb-2 opacity-30 group-hover:opacity-50 transition-opacity">
            📷
          </div>
          <p className="text-xs text-white/40">
            Drag & drop or <span className="text-purple-400">browse</span>
          </p>
          {aspectHint && (
            <p className="text-[10px] text-white/25 mt-1">{aspectHint}</p>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

