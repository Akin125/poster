import PosterBuilder from "@/components/PosterBuilder";
import { IWD_PRESET } from "@/lib/poster-presets";

export default function CreateIwdPage() {
  return <PosterBuilder preset={IWD_PRESET} />;
}

