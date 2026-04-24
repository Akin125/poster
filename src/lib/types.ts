export type BackgroundOption = "black";

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  unit: "px" | "%";
}

export interface FloatingPosition {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface NameOverlayConfig {
  enabled: boolean;
  fontCssVariable: string;
  color: string;
  y: number;
  fontSize: number;
  surnameWeight: number;
  otherWeight: number;
}

export interface PosterPreset {
  id: "iwd" | "white-coat-ceremony" | "birthday";
  title: string;
  subtitle: string;
  mainLabel: string;
  mainSublabel: string;
  floatingSectionLabel: string;
  enableFloaters: boolean;
  mainGrayscaleLabel: string;
  overlayPath: string;
  floatingPositions: [FloatingPosition, FloatingPosition, FloatingPosition];
  nameOverlay?: NameOverlayConfig;
  exportFilePrefix: string;
}

export interface PosterNameFields {
  surname: string;
  firstName: string;
  otherName: string;
}

export interface ImageSlot {
  id: string;
  file: File | null;
  objectURL: string | null;
  croppedURL: string | null;
  crop: CropData | null;
  isGrayscale: boolean;
}

export interface PosterState {
  mainImage: ImageSlot;
  floatingImages: [ImageSlot, ImageSlot, ImageSlot];
  nameFields: PosterNameFields;
  background: BackgroundOption;
  mainGrayscale: boolean;
  activeCropSlot: string | null;
}

export type PosterAction =
  | { type: "SET_IMAGE"; slotId: string; file: File; objectURL: string }
  | { type: "REMOVE_IMAGE"; slotId: string }
  | { type: "SET_CROP"; slotId: string; crop: CropData; croppedURL: string }
  | { type: "SET_NAME_FIELD"; field: keyof PosterNameFields; value: string }
  | { type: "TOGGLE_MAIN_GRAYSCALE" }
  | { type: "OPEN_CROP"; slotId: string }
  | { type: "CLOSE_CROP" };

