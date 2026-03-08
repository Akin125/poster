export const CANVAS_W = 3000;
export const CANVAS_H = 3500;

export const PREVIEW_SCALE = 0.2;

// Main portrait — fills the entire canvas
export const MAIN_PORTRAIT = {
  x: 0,        // left edge (0 = flush left)
  y: 0,        // top edge  (0 = flush top)
  width: 3000, // full canvas width
  height: 3500, // full canvas height
};

// ──────────────────────────────────────────────────────────
// FLOATING IMAGE POSITIONS — adjust these to reposition them
//
//   x      → horizontal position in px (0 = left edge, 3000 = right edge)
//   y      → vertical position in px   (0 = top edge,  3500 = bottom edge)
//   width  → image width in px
//   height → image height in px
//   label  → display name in the UI
//
// The canvas is 3000 × 3500. All values are in that coordinate space.
// ──────────────────────────────────────────────────────────
export const FLOATING_POSITIONS = [
  { label: "Top Left",     x: 240,   y: 400,  width: 900, height: 1100 },
  { label: "Bottom Right",  x: 1650, y: 2000, width: 880, height: 1100 },
  { label: "Bottom Left",   x: 240,   y: 2300, width: 750, height: 750  },
] as const;

export const OVERLAY_PATH = "/all.png";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp";

