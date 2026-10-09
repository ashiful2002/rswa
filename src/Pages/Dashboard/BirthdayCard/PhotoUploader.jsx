import { useRef, useState } from "react";
import {
  Upload,
  Loader2,
  Sparkles,
  X,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { removeBackgroundFromImage } from "./removeBackground";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const PhotoUploader = ({
  originalPhotoUrl,
  transparentPhotoUrl,
  useTransparent,
  onPhotoSelected,
  onRemovePhoto,
  onToggleTransparent,
}) => {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressState, setProgressState] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so re-selecting same file triggers change
    e.target.value = "";

    // 1. Validate File Type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please select a valid image file (JPG, PNG, or WebP).");
      return;
    }

    // 2. Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit. Please choose a smaller image.`);
      return;
    }

    setError(null);

    // Create local object URL for preview
    const originalUrl = URL.createObjectURL(file);

    // Start background removal
    setIsProcessing(true);
    setProgressState("Initializing AI background remover...");

    try {
      const { objectUrl: transparentUrl } = await removeBackgroundFromImage(
        file,
        (progress) => {
          if (progress.stage) {
            setProgressState(`Processing (${progress.percent || 0}%)...`);
          }
        }
      );

      // Successfully removed background
      onPhotoSelected({
        originalUrl,
        transparentUrl,
        file,
      });
    } catch (err) {
      console.warn("Auto background removal issue:", err);
      // Gracefully fallback to original photo so user is not blocked
      setError(
        "Could not automatically remove background. Using original photo instead. You can still create and download the card."
      );
      onPhotoSelected({
        originalUrl,
        transparentUrl: null,
        file,
      });
    } finally {
      setIsProcessing(false);
      setProgressState(null);
    }
  };

  const handleManualRemoveBg = async () => {
    if (!originalPhotoUrl || isProcessing) return;

    setIsProcessing(true);
    setError(null);
    setProgressState("Removing background...");

    try {
      const { objectUrl: transparentUrl } = await removeBackgroundFromImage(
        originalPhotoUrl,
        (progress) => {
          setProgressState(`Processing (${progress.percent || 0}%)...`);
        }
      );

      onPhotoSelected({
        originalUrl: originalPhotoUrl,
        transparentUrl,
      });
    } catch (err) {
      setError(err?.message || "Failed to remove background.");
    } finally {
      setIsProcessing(false);
      setProgressState(null);
    }
  };

  const handleClear = () => {
    setError(null);
    setIsProcessing(false);
    setProgressState(null);
    onRemovePhoto();
  };

  const currentPreviewUrl =
    useTransparent && transparentPhotoUrl
      ? transparentPhotoUrl
      : originalPhotoUrl;

  return (
    <div className="space-y-4">
      {/* Upload Zone or Active Preview */}
      {!currentPreviewUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-6 text-center transition-all hover:border-emerald-500 hover:bg-emerald-50/30 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:border-emerald-500"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-105 dark:bg-emerald-950/70 dark:text-emerald-400">
            {isProcessing ? (
              <Loader2 className="h-7 w-7 animate-spin" />
            ) : (
              <Upload className="h-7 w-7" />
            )}
          </div>

          <div className="mt-3">
            <p className="text-xs font-bold text-slate-800 dark:text-white">
              Click or drag to upload portrait
            </p>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Supports JPG, PNG, WebP up to {MAX_FILE_SIZE_MB}MB
            </p>
          </div>

          <div className="mt-3 flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Sparkles className="h-3 w-3" />
            <span>Automatic AI Background Removal</span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        /* Photo Uploaded Preview Card */
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            {/* Thumbnail with transparency grid */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-[linear-gradient(45deg,#f1f5f9_25%,transparent_25%),linear-gradient(-45deg,#f1f5f9_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f1f5f9_75%),linear-gradient(-45deg,transparent_75%,#f1f5f9_75%)] bg-[size:12px_12px] dark:border-slate-700">
              <img
                src={currentPreviewUrl}
                alt="Selected Portrait"
                className="h-full w-full object-contain"
              />
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              )}
            </div>

            {/* Info and Actions */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-xs font-bold text-slate-800 dark:text-white">
                  Portrait Ready
                </span>
                {transparentPhotoUrl && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> BG Removed
                  </span>
                )}
              </div>

              {/* Toggle transparent vs original */}
              {transparentPhotoUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleTransparent(true)}
                    className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition-colors ${
                      useTransparent
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    Transparent
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleTransparent(false)}
                    className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition-colors ${
                      !useTransparent
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    Original
                  </button>
                </div>
              )}

              {/* Action buttons: Replace / Retry Remove BG / Remove */}
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Replace Photo
                </button>

                {!transparentPhotoUrl && !isProcessing && (
                  <button
                    type="button"
                    onClick={handleManualRemoveBg}
                    className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300"
                  >
                    <Sparkles className="h-3 w-3" /> Remove BG
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                  title="Remove photo"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Progress banner */}
      {isProcessing && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200">
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-emerald-600" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{progressState || "Processing portrait..."}</p>
            <p className="text-[10px] text-emerald-600/80 dark:text-emerald-400">
              Running locally in your browser. No files are uploaded to external servers.
            </p>
          </div>
        </div>
      )}

      {/* Error alert */}
      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
          <div className="flex-1">
            <p className="font-medium">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-rose-400 hover:text-rose-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
