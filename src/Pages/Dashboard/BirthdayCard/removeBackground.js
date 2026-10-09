import { removeBackground as imglyRemoveBackground } from "@imgly/background-removal";

/**
 * Removes background from an image file or URL in the browser using @imgly/background-removal.
 * Returns a new object URL for the transparent PNG image.
 *
 * @param {File|Blob|string} imageSource - The source photo
 * @param {Function} [onProgress] - Optional callback for download/processing progress
 * @returns {Promise<{ objectUrl: string, blob: Blob }>}
 */
export const removeBackgroundFromImage = async (imageSource, onProgress) => {
  if (!imageSource) {
    throw new Error("No image source provided for background removal.");
  }

  try {
    const config = {
      progress: (key, current, total) => {
        if (typeof onProgress === "function") {
          const percent = total > 0 ? Math.round((current / total) * 100) : 0;
          onProgress({ stage: key, percent, current, total });
        }
      },
      // Use standard model for fast & high-quality browser segmentation
      model: "medium",
      output: {
        format: "image/png",
        quality: 0.95,
      },
    };

    const blob = await imglyRemoveBackground(imageSource, config);
    const objectUrl = URL.createObjectURL(blob);

    return { objectUrl, blob };
  } catch (error) {
    console.error("Background removal processing failed:", error);
    throw new Error(
      error?.message ||
        "Browser-based background removal failed. You can still use the original photo directly."
    );
  }
};

/**
 * Safely revokes a previously created Object URL.
 * @param {string} url
 */
export const safeRevokeUrl = (url) => {
  if (url && typeof url === "string" && url.startsWith("blob:")) {
    try {
      URL.revokeObjectURL(url);
    } catch {
      // Ignore revocation error
    }
  }
};
