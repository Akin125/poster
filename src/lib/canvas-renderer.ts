import {
  CANVAS_W,
  CANVAS_H,
  FLOATING_POSITIONS,
  OVERLAY_PATH,
} from "./constants";
import { PosterState } from "./types";
import { loadImage, drawImageCover, drawRoundedRect } from "./image-utils";

export async function renderPoster(
  canvas: HTMLCanvasElement,
  state: PosterState,
  scale: number = 1
): Promise<void> {
  const w = Math.round(CANVAS_W * scale);
  const h = Math.round(CANVAS_H * scale);
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, w, h);

  // --- Layer 1: Background (always black) ---
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, w, h);

  // --- Layer 2: Main portrait (full canvas) ---
  const mainSrc = state.mainImage.croppedURL || state.mainImage.objectURL;
  if (mainSrc) {
    try {
      const mainImg = await loadImage(mainSrc);
      ctx.save();
      if (state.mainGrayscale) {
        ctx.filter = "grayscale(1)";
      }
      drawImageCover(ctx, mainImg, 0, 0, w, h);
      ctx.filter = "none";
      ctx.restore();
    } catch {
      // skip
    }
  }

  // --- Layer 3: Overlay asset (all.png) — full canvas size ---
  try {
    const overlay = await loadImage(OVERLAY_PATH);
    ctx.drawImage(overlay, 0, 0, w, h);
  } catch {
    // overlay not available — skip silently
  }

  // --- Layer 4: Floating images (grayscale, on top of everything) ---
  for (let i = 0; i < 3; i++) {
    const slot = state.floatingImages[i];
    const pos = FLOATING_POSITIONS[i];
    const imgSrc = slot.croppedURL || slot.objectURL;
    if (!imgSrc) continue;

    try {
      const img = await loadImage(imgSrc);
      const x = Math.round(pos.x * scale);
      const y = Math.round(pos.y * scale);
      const fw = Math.round(pos.width * scale);
      const fh = Math.round(pos.height * scale);
      const radius = Math.round(20 * scale);

      ctx.save();
      drawRoundedRect(ctx, x, y, fw, fh, radius);
      ctx.clip();
      ctx.filter = "grayscale(1)";
      drawImageCover(ctx, img, x, y, fw, fh);
      ctx.filter = "none";
      ctx.restore();

      // Subtle border
      ctx.save();
      drawRoundedRect(ctx, x, y, fw, fh, radius);
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = Math.round(3 * scale);
      ctx.stroke();
      ctx.restore();
    } catch {
      // skip
    }
  }
}

export async function exportPoster(state: PosterState): Promise<Blob> {
  const canvas = document.createElement("canvas");
  await renderPoster(canvas, state, 1);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export poster"));
      },
      "image/png",
      1.0
    );
  });
}

