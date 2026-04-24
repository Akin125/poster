import {
  CANVAS_W,
  CANVAS_H,
} from "./constants";
import { NameOverlayConfig, PosterPreset, PosterState } from "./types";
import { loadImage, drawImageCover, drawRoundedRect } from "./image-utils";

function resolveFontFamily(nameOverlay: NameOverlayConfig): string {
  if (typeof document === "undefined") {
    return "sans-serif";
  }

  const family = getComputedStyle(document.body)
    .getPropertyValue(nameOverlay.fontCssVariable)
    .trim();

  return family ? `${family}, sans-serif` : "sans-serif";
}

async function drawNameOverlay(
  ctx: CanvasRenderingContext2D,
  state: PosterState,
  preset: PosterPreset,
  w: number,
  scale: number
): Promise<void> {
  const nameOverlay = preset.nameOverlay;
  if (!nameOverlay?.enabled) return;

  const surname = state.nameFields.surname.trim().toUpperCase();
  const firstName = state.nameFields.firstName.trim();
  const otherName = state.nameFields.otherName.trim();

  const rest = [firstName, otherName].filter(Boolean).join(" ");
  if (!surname && !rest) return;

  const fontSize = Math.round(nameOverlay.fontSize * scale);
  const y = Math.round(nameOverlay.y * scale);
  const family = resolveFontFamily(nameOverlay);

  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await Promise.all([
        document.fonts.load(`${nameOverlay.surnameWeight} ${fontSize}px ${family}`),
        document.fonts.load(`${nameOverlay.otherWeight} ${fontSize}px ${family}`),
      ]);
    } catch {
      // fallback to currently available fonts
    }
  }

  const restText = rest ? `${surname ? " " : ""}${rest}` : "";

  ctx.save();
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = nameOverlay.color;

  let surnameWidth = 0;
  if (surname) {
    ctx.font = `${nameOverlay.surnameWeight} ${fontSize}px ${family}`;
    surnameWidth = ctx.measureText(surname).width;
  }

  ctx.font = `${nameOverlay.otherWeight} ${fontSize}px ${family}`;
  const restWidth = restText ? ctx.measureText(restText).width : 0;

  let cursorX = Math.round((w - (surnameWidth + restWidth)) / 2);

  if (surname) {
    ctx.font = `${nameOverlay.surnameWeight} ${fontSize}px ${family}`;
    ctx.fillText(surname, cursorX, y);
    cursorX += surnameWidth;
  }

  if (restText) {
    ctx.font = `${nameOverlay.otherWeight} ${fontSize}px ${family}`;
    ctx.fillText(restText, cursorX, y);
  }

  ctx.restore();
}

export async function renderPoster(
  canvas: HTMLCanvasElement,
  state: PosterState,
  preset: PosterPreset,
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
    const overlay = await loadImage(preset.overlayPath);
    ctx.drawImage(overlay, 0, 0, w, h);
  } catch {
    // overlay not available — skip silently
  }

  // --- Layer 4: Floating images (grayscale, on top of everything) ---
  if (preset.enableFloaters) {
    for (let i = 0; i < 3; i++) {
      const slot = state.floatingImages[i];
      const pos = preset.floatingPositions[i];
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

  // --- Layer 5: Name overlay (white-coat template) ---
  await drawNameOverlay(ctx, state, preset, w, scale);
}

export async function exportPoster(state: PosterState, preset: PosterPreset): Promise<Blob> {
  const canvas = document.createElement("canvas");
  await renderPoster(canvas, state, preset, 1);
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

