"use client";

import React, { useReducer, useCallback } from "react";
import { PosterState, PosterAction, ImageSlot } from "@/lib/types";
import { FLOATING_POSITIONS, MAIN_PORTRAIT } from "@/lib/constants";
import ImageUploader from "./ImageUploader";
import ImageCropper from "./ImageCropper";
import PosterPreview from "./PosterPreview";
import ExportButton from "./ExportButton";

function createEmptySlot(id: string, isGrayscale: boolean = false): ImageSlot {
  return {
    id,
    file: null,
    objectURL: null,
    croppedURL: null,
    crop: null,
    isGrayscale,
  };
}

const initialState: PosterState = {
  mainImage: createEmptySlot("main"),
  floatingImages: [
    createEmptySlot("float-0", true),
    createEmptySlot("float-1", true),
    createEmptySlot("float-2", true),
  ],
  background: "black",
  mainGrayscale: false,
  activeCropSlot: null,
};

function posterReducer(state: PosterState, action: PosterAction): PosterState {
  switch (action.type) {
    case "SET_IMAGE": {
      if (action.slotId === "main") {
        return {
          ...state,
          mainImage: {
            ...state.mainImage,
            file: action.file,
            objectURL: action.objectURL,
            croppedURL: null,
            crop: null,
          },
          activeCropSlot: "main",
        };
      }
      const idx = parseInt(action.slotId.replace("float-", ""));
      const newFloating = [...state.floatingImages] as [ImageSlot, ImageSlot, ImageSlot];
      newFloating[idx] = {
        ...newFloating[idx],
        file: action.file,
        objectURL: action.objectURL,
        croppedURL: null,
        crop: null,
      };
      return { ...state, floatingImages: newFloating, activeCropSlot: action.slotId };
    }

    case "REMOVE_IMAGE": {
      if (action.slotId === "main") {
        if (state.mainImage.objectURL) URL.revokeObjectURL(state.mainImage.objectURL);
        if (state.mainImage.croppedURL) URL.revokeObjectURL(state.mainImage.croppedURL);
        return { ...state, mainImage: createEmptySlot("main") };
      }
      const idx = parseInt(action.slotId.replace("float-", ""));
      const newFloating = [...state.floatingImages] as [ImageSlot, ImageSlot, ImageSlot];
      if (newFloating[idx].objectURL) URL.revokeObjectURL(newFloating[idx].objectURL!);
      if (newFloating[idx].croppedURL) URL.revokeObjectURL(newFloating[idx].croppedURL!);
      newFloating[idx] = createEmptySlot(`float-${idx}`, true);
      return { ...state, floatingImages: newFloating };
    }

    case "SET_CROP": {
      if (action.slotId === "main") {
        return {
          ...state,
          mainImage: {
            ...state.mainImage,
            crop: { ...action.crop, unit: "px" },
            croppedURL: action.croppedURL,
          },
          activeCropSlot: null,
        };
      }
      const idx = parseInt(action.slotId.replace("float-", ""));
      const newFloating = [...state.floatingImages] as [ImageSlot, ImageSlot, ImageSlot];
      newFloating[idx] = {
        ...newFloating[idx],
        crop: { ...action.crop, unit: "px" },
        croppedURL: action.croppedURL,
      };
      return { ...state, floatingImages: newFloating, activeCropSlot: null };
    }


    case "TOGGLE_MAIN_GRAYSCALE":
      return { ...state, mainGrayscale: !state.mainGrayscale };

    case "OPEN_CROP":
      return { ...state, activeCropSlot: action.slotId };

    case "CLOSE_CROP":
      return { ...state, activeCropSlot: null };

    default:
      return state;
  }
}

export default function PosterBuilder() {
  const [state, dispatch] = useReducer(posterReducer, initialState);

  const handleUpload = useCallback(
    (slotId: string) => (file: File, objectURL: string) => {
      dispatch({ type: "SET_IMAGE", slotId, file, objectURL });
    },
    []
  );

  const handleRemove = useCallback(
    (slotId: string) => () => {
      dispatch({ type: "REMOVE_IMAGE", slotId });
    },
    []
  );

  const handleCropOpen = useCallback(
    (slotId: string) => () => {
      dispatch({ type: "OPEN_CROP", slotId });
    },
    []
  );

  const handleCropApply = useCallback(
    (slotId: string) =>
      (croppedURL: string, cropData: { x: number; y: number; width: number; height: number }) => {
        dispatch({
          type: "SET_CROP",
          slotId,
          crop: { ...cropData, unit: "px" },
          croppedURL,
        });
      },
    []
  );

  const getActiveCropSrc = (): string | null => {
    if (!state.activeCropSlot) return null;
    if (state.activeCropSlot === "main") return state.mainImage.objectURL;
    const idx = parseInt(state.activeCropSlot.replace("float-", ""));
    return state.floatingImages[idx]?.objectURL ?? null;
  };

  const getActiveCropAspect = (): number | undefined => {
    if (!state.activeCropSlot) return undefined;
    if (state.activeCropSlot === "main") {
      return MAIN_PORTRAIT.width / MAIN_PORTRAIT.height;
    }
    const idx = parseInt(state.activeCropSlot.replace("float-", ""));
    const pos = FLOATING_POSITIONS[idx];
    return pos ? pos.width / pos.height : undefined;
  };

  const activeCropSrc = getActiveCropSrc();
  const hasMainImage = !!state.mainImage.objectURL;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left: Controls */}
          <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 space-y-6">
            {/* Step 1: Upload Images */}
            <section className="bg-white/[0.02] rounded-2xl border border-white/5 p-5">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center">1</span>
                <h2 className="text-sm font-semibold tracking-wide text-white/80">Upload Images</h2>
              </div>

              <div className="space-y-4">
                <ImageUploader
                  label="Main Portrait"
                  sublabel="Central focus • Full color"
                  imageURL={state.mainImage.croppedURL || state.mainImage.objectURL}
                  onUpload={handleUpload("main")}
                  onRemove={handleRemove("main")}
                  onCrop={handleCropOpen("main")}
                  aspectHint="Optimized for vertical frame"
                />

                <div className="pt-2 border-t border-white/5">
                  <p className="text-xs text-white/30 mb-3 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-white/20" />
                    Floating Images — auto-converted to B&W
                  </p>
                  <div className="space-y-3">
                    {state.floatingImages.map((slot, i) => (
                      <ImageUploader
                        key={slot.id}
                        label={`Floating ${i + 1}`}
                        sublabel={FLOATING_POSITIONS[i].label}
                        imageURL={slot.croppedURL || slot.objectURL}
                        onUpload={handleUpload(`float-${i}`)}
                        onRemove={handleRemove(`float-${i}`)}
                        onCrop={handleCropOpen(`float-${i}`)}
                        isGrayscale={true}
                        aspectHint={`${FLOATING_POSITIONS[i].width}×${FLOATING_POSITIONS[i].height}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2: Customize */}
            <section className="bg-white/[0.02] rounded-2xl border border-white/5 p-5">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold flex items-center justify-center">2</span>
                <h2 className="text-sm font-semibold tracking-wide text-white/80">Customize</h2>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white/90 tracking-wide uppercase">
                    Main Portrait B&W
                  </h3>
                  <p className="text-xs text-white/40 mt-0.5">
                    Convert main portrait to grayscale
                  </p>
                </div>
                <button
                  onClick={() => dispatch({ type: "TOGGLE_MAIN_GRAYSCALE" })}
                  disabled={!hasMainImage}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer
                    ${state.mainGrayscale ? "bg-purple-500" : "bg-white/10"}
                    ${!hasMainImage ? "opacity-30 cursor-not-allowed" : ""}`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300
                      ${state.mainGrayscale ? "left-[26px]" : "left-0.5"}`}
                  />
                </button>
              </div>
            </section>

            {/* Step 3: Export */}
            <section className="bg-white/[0.02] rounded-2xl border border-white/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">3</span>
                <h2 className="text-sm font-semibold tracking-wide text-white/80">Export</h2>
              </div>

              <ExportButton state={state} disabled={!hasMainImage} />

              {!hasMainImage && (
                <p className="text-xs text-white/25 text-center mt-2">
                  Upload at least the main portrait to export
                </p>
              )}
            </section>
          </div>

          {/* Right: Preview */}
          <div className="flex-1 lg:sticky lg:top-24 lg:self-start">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white/50 tracking-wide uppercase">
                Live Preview
              </h2>
              <span className="text-[10px] text-white/20 tracking-wider">
                SCALED PREVIEW • EXPORT AT FULL RES
              </span>
            </div>
            <PosterPreview state={state} />
          </div>
        </div>
      </main>

      {/* Crop Modal */}
      {state.activeCropSlot && activeCropSrc && (
        <ImageCropper
          imageSrc={activeCropSrc}
          aspect={getActiveCropAspect()}
          onApply={handleCropApply(state.activeCropSlot)}
          onCancel={() => dispatch({ type: "CLOSE_CROP" })}
        />
      )}
    </div>
  );
}
