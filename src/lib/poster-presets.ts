import type { PosterPreset } from "./types";

export const IWD_PRESET: PosterPreset = {
  id: "iwd",
  title: "IWD Poster Creator",
  subtitle: "International Women's Day campaign",
  mainLabel: "Main Portrait",
  mainSublabel: "Central focus - Full color",
  floatingSectionLabel: "Floating Images - auto-converted to B&W",
  enableFloaters: true,
  mainGrayscaleLabel: "Main Portrait B&W",
  overlayPath: "/all.png",
  floatingPositions: [
    { label: "Top Left", x: 240, y: 400, width: 900, height: 1100 },
    { label: "Bottom Right", x: 1650, y: 2000, width: 880, height: 1100 },
    { label: "Bottom Left", x: 240, y: 2300, width: 750, height: 750 },
  ],
  exportFilePrefix: "iwd-poster",
};

export const WHITE_COAT_PRESET: PosterPreset = {
  id: "white-coat-ceremony",
  title: "White Coat Ceremony Creator",
  subtitle: "Induction and recognition poster",
  mainLabel: "Main Portrait",
  mainSublabel: "Ceremony focal portrait",
  floatingSectionLabel: "No floating images for this template",
  enableFloaters: false,
  mainGrayscaleLabel: "Main Portrait B&W",
  overlayPath: "/WCC.png",
  floatingPositions: [
    { label: "Top Right", x: 1800, y: 320, width: 880, height: 1020 },
    { label: "Bottom Left", x: 260, y: 1880, width: 940, height: 1120 },
    { label: "Center Accent", x: 1140, y: 2380, width: 700, height: 760 },
  ],
  nameOverlay: {
    enabled: true,
    fontCssVariable: "--font-funnel",
    color: "#FFFFFF",
    y: 3250,
    fontSize: 110,
    surnameWeight: 800,
    otherWeight: 400,
  },
  exportFilePrefix: "white-coat-poster",
};

