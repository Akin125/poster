export type BackgroundOption = "black";

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  unit: "px" | "%";
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
  background: BackgroundOption;
  mainGrayscale: boolean;
  activeCropSlot: string | null;
}

export type PosterAction =
  | { type: "SET_IMAGE"; slotId: string; file: File; objectURL: string }
  | { type: "REMOVE_IMAGE"; slotId: string }
  | { type: "SET_CROP"; slotId: string; crop: CropData; croppedURL: string }
  | { type: "TOGGLE_MAIN_GRAYSCALE" }
  | { type: "OPEN_CROP"; slotId: string }
  | { type: "CLOSE_CROP" };

