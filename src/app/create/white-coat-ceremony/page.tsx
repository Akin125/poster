import PosterBuilder from "@/components/PosterBuilder";
import { WHITE_COAT_PRESET } from "@/lib/poster-presets";

export default function CreateWhiteCoatPage() {
  return <PosterBuilder preset={WHITE_COAT_PRESET} />;
}
