import { useEffect, useRef, useState } from "react";
import { Download, Loader2, Sparkles } from "lucide-react";
import Swal from "sweetalert2";
import {
  renderBirthdayCard,
  downloadBirthdayCardPNG,
  loadImage,
} from "./renderBirthdayCard";
import { BIRTHDAY_CARD_CONFIG } from "./birthdayCardConfig";

const BirthdayCardPreview = ({
  photoUrl,
  name,
  designation,
  greeting,
  organization,
  committee,
  website,
  options,
  hasPhoto,
}) => {
  const canvasRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [loadedPortrait, setLoadedPortrait] = useState(null);
  const [loadedLogo, setLoadedLogo] = useState(null);

  // 1. Preload RSWA Logo on mount
  useEffect(() => {
    let active = true;
    loadImage(BIRTHDAY_CARD_CONFIG.logo.src).then((img) => {
      if (active && img) setLoadedLogo(img);
    });
    return () => {
      active = false;
    };
  }, []);

  // 2. Load portrait image whenever photoUrl changes
  useEffect(() => {
    let active = true;
    if (photoUrl) {
      loadImage(photoUrl).then((img) => {
        if (active) setLoadedPortrait(img);
      });
    } else {
      setLoadedPortrait(null);
    }
    return () => {
      active = false;
    };
  }, [photoUrl]);

  // 3. Render canvas whenever any input changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderBirthdayCard(canvas, {
      portraitImg: loadedPortrait,
      name,
      designation,
      greeting,
      organization,
      committee,
      website,
      logoImg: loadedLogo,
      options,
    });
  }, [
    loadedPortrait,
    loadedLogo,
    name,
    designation,
    greeting,
    organization,
    committee,
    website,
    options,
  ]);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    try {
      const filename = await downloadBirthdayCardPNG(canvas, name);
      Swal.fire({
        icon: "success",
        title: "Card Downloaded!",
        text: `Successfully exported ${filename}`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Download error:", err);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: err?.message || "Could not generate PNG from canvas.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Canvas Container with realistic poster drop-shadow & aspect ratio */}
      <div className="group relative w-full max-w-[420px] overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2 shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900">
        {/* Hidden full-res Canvas element with CSS responsive scaling */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-inner">
          <canvas
            ref={canvasRef}
            className="h-full w-full object-contain"
            style={{ display: "block" }}
          />

          {!hasPhoto && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center">
              <span className="backdrop-blur-xs rounded-full bg-slate-900/60 px-3 py-1 text-[11px] font-semibold text-white">
                Upload a portrait to complete photo card
              </span>
            </div>
          )}
        </div>

        {/* Resolution Badge */}
        <div className="mt-2.5 flex items-center justify-between px-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 font-medium">
            <Sparkles className="h-3 w-3 text-amber-500" />
            1080 × 1080 High-Res Square PNG
          </span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            1:1 Square Canvas Output
          </span>
        </div>
      </div>

      {/* Download Action Button */}
      <div className="w-full max-w-[420px]">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isExporting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl active:scale-[0.99] disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating High-Res PNG...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Download High-Res PNG</span>
            </>
          )}
        </button>
        <p className="mt-2 text-center text-[10px] text-slate-400">
          Clean transparent background portrait rendered directly onto the
          poster canvas.
        </p>
      </div>
    </div>
  );
};

export default BirthdayCardPreview;
