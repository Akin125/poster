import {
  CANVAS_W,
  CANVAS_H,
} from "./constants";
import { PosterPreset, PosterState } from "./types";
import { loadImage, drawImageCover, drawRoundedRect } from "./image-utils";

function resolveFontFamily(fontCssVariable: string): string {
  if (typeof document === "undefined") {
    return "sans-serif";
  }

  const family = getComputedStyle(document.body)
    .getPropertyValue(fontCssVariable)
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
  const family = resolveFontFamily(nameOverlay.fontCssVariable);

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

async function drawBirthdayOverlay(
  ctx: CanvasRenderingContext2D,
  state: PosterState,
  preset: PosterPreset,
  scale: number
): Promise<void> {
  const birthdayOverlay = preset.birthdayOverlay;
  if (!birthdayOverlay?.enabled) return;

  const surname = state.nameFields.surname.trim().toUpperCase();
  const firstName = state.nameFields.firstName.trim();
  const otherName = state.nameFields.otherName.trim();
  const classStatus = state.nameFields.classStatus.trim();
  const day = state.nameFields.day.trim();
  const month = state.nameFields.month.trim();
  const restName = [firstName, otherName].filter(Boolean).join(" ");
  const restNameText = restName ? `${surname ? " " : ""}${restName}` : "";
  const formattedDay = day;
  const formattedMonth = month
    ? `${month.toUpperCase().replace(/\.+$/, "")}.`
    : "";

  const fullName = [surname, restName].filter(Boolean).join(" ");
  const dateText = [formattedDay, formattedMonth].filter(Boolean).join(" ");
  if (!fullName && !classStatus && !dateText) return;

  const dateX = birthdayOverlay.dateX ?? birthdayOverlay.nameX;
  const nameColor = birthdayOverlay.nameColor ?? birthdayOverlay.accentColor;
  const surnameWeight = birthdayOverlay.surnameWeight ?? birthdayOverlay.nameWeight;
  const otherNameWeight = birthdayOverlay.otherNameWeight ?? birthdayOverlay.nameWeight;
  const statusColor = birthdayOverlay.statusColor ?? birthdayOverlay.color;
  const statusWeight = birthdayOverlay.statusWeight ?? birthdayOverlay.detailWeight;
  const dateColor = birthdayOverlay.dateColor ?? birthdayOverlay.accentColor;
  const dayWeight = birthdayOverlay.dayWeight ?? birthdayOverlay.nameWeight;
  const monthWeight = birthdayOverlay.monthWeight ?? birthdayOverlay.nameWeight;

  const family = resolveFontFamily(birthdayOverlay.fontCssVariable);
  const nameFontSize = Math.round(birthdayOverlay.nameFontSize * scale);
  const detailFontSize = Math.round(birthdayOverlay.statusFontSize * scale);
  const dateFontSize = Math.round(birthdayOverlay.dateFontSize * scale);

  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await Promise.all([
        document.fonts.load(`${surnameWeight} ${nameFontSize}px ${family}`),
        document.fonts.load(`${otherNameWeight} ${nameFontSize}px ${family}`),
        document.fonts.load(`${statusWeight} ${detailFontSize}px ${family}`),
        document.fonts.load(`${dayWeight} ${dateFontSize}px ${family}`),
        document.fonts.load(`${monthWeight} ${dateFontSize}px ${family}`),
      ]);
    } catch {
      // fallback to currently available fonts
    }
  }

  const x = Math.round(birthdayOverlay.nameX * scale);
  const dateCenterX = Math.round(dateX * scale);
  const nameY = Math.round(birthdayOverlay.nameY * scale);
  const statusY = Math.round(birthdayOverlay.statusY * scale);
  const dateY = Math.round(birthdayOverlay.dateY * scale);

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  if (fullName) {
    ctx.save();
    ctx.textAlign = "left";
    ctx.fillStyle = nameColor;

    let surnameWidth = 0;
    if (surname) {
      ctx.font = `${surnameWeight} ${nameFontSize}px ${family}`;
      surnameWidth = ctx.measureText(surname).width;
    }

    ctx.font = `${otherNameWeight} ${nameFontSize}px ${family}`;
    const otherWidth = restNameText ? ctx.measureText(restNameText).width : 0;

    let cursorX = Math.round(x - (surnameWidth + otherWidth) / 2);

    if (surname) {
      ctx.font = `${surnameWeight} ${nameFontSize}px ${family}`;
      ctx.fillText(surname, cursorX, nameY);
      cursorX += surnameWidth;
    }

    if (restNameText) {
      ctx.font = `${otherNameWeight} ${nameFontSize}px ${family}`;
      ctx.fillText(restNameText, cursorX, nameY);
    }

    ctx.restore();
  }

  if (classStatus) {
    ctx.fillStyle = statusColor;
    ctx.font = `${statusWeight} ${detailFontSize}px ${family}`;
    ctx.fillText(classStatus, x, statusY);
  }

  if (dateText) {
    const verticalGap = Math.max(3, Math.round(7 * scale));
    const hasDay = Boolean(formattedDay);
    const hasMonth = Boolean(formattedMonth);

    ctx.fillStyle = dateColor;
    if (hasDay) {
      ctx.font = `${dayWeight} ${dateFontSize}px ${family}`;
      ctx.fillText(formattedDay, dateCenterX, dateY);
    }
    if (hasMonth) {
      ctx.font = `${monthWeight} ${dateFontSize}px ${family}`;
      const monthY = hasDay ? dateY + dateFontSize + verticalGap : dateY;
      ctx.fillText(formattedMonth, dateCenterX, monthY);
    }
  }

  ctx.restore();
}

export async function renderPoster(
  canvas: HTMLCanvasElement,
  state: PosterState,
  preset: PosterPreset,
  scale: number = 1
): Promise<void> {
  const baseWidth = preset.canvasWidth ?? CANVAS_W;
  const baseHeight = preset.canvasHeight ?? CANVAS_H;
  const w = Math.round(baseWidth * scale);
  const h = Math.round(baseHeight * scale);
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
      const mainPlacement = preset.mainImagePlacement ?? { x: 0, y: 0, width: baseWidth, height: baseHeight };
      const mainX = Math.round(mainPlacement.x * scale);
      const mainY = Math.round(mainPlacement.y * scale);
      const mainW = Math.round(mainPlacement.width * scale);
      const mainH = Math.round(mainPlacement.height * scale);
      const rotationRad = ((mainPlacement.rotationDeg ?? 0) * Math.PI) / 180;
      ctx.save();
      if (state.mainGrayscale) {
        ctx.filter = "grayscale(1)";
      }
      if (rotationRad !== 0) {
        // Keep the image inside the frame while rotating around the center.
        ctx.beginPath();
        ctx.rect(mainX, mainY, mainW, mainH);
        ctx.clip();
        ctx.translate(mainX + mainW / 2, mainY + mainH / 2);
        ctx.rotate(rotationRad);
        drawImageCover(ctx, mainImg, -mainW / 2, -mainH / 2, mainW, mainH);
      } else {
        drawImageCover(ctx, mainImg, mainX, mainY, mainW, mainH);
      }
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

  // --- Layer 6: Birthday overlay text ---
  await drawBirthdayOverlay(ctx, state, preset, scale);
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

