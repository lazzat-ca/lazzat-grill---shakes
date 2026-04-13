// src/lib/image-utils.ts
// Image compression + 45 KB hard limit utilities

export const MAX_IMAGE_BYTES = 45 * 1024; // 45 KB

/**
 * Compress an image File to a Blob.
 * Tries JPEG quality steps until the file fits within MAX_IMAGE_BYTES.
 * Returns null if it cannot be compressed small enough.
 */
export const compressImage = async (
  file: File,
  maxBytes = MAX_IMAGE_BYTES
): Promise<Blob | null> => {
  // If already small enough, return as-is (converted to same type)
  if (file.size <= maxBytes) {
    // Still run through canvas to normalize format to JPEG
    return resizeAndEncode(file, 1.0, maxBytes);
  }
  // Try quality steps: 0.85, 0.75, 0.6, 0.45, 0.3
  const qualities = [0.85, 0.75, 0.60, 0.45, 0.30];
  for (const quality of qualities) {
    const blob = await resizeAndEncode(file, quality, maxBytes);
    if (blob && blob.size <= maxBytes) return blob;
  }
  return null;
};

const resizeAndEncode = (
  file: File,
  quality: number,
  maxBytes: number
): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;

      // Scale down if the image is very large (helps reduce file size)
      const MAX_DIM = 1200;
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(null); return; }
          if (blob.size <= maxBytes) {
            resolve(blob);
          } else {
            resolve(null);
          }
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
};

/**
 * Converts a Blob to a base64 data URL string.
 */
export const blobToDataURL = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Full pipeline: validate → compress → return data URL.
 * Throws with a user-friendly message on failure.
 */
export const processImageUpload = async (
  file: File
): Promise<string> => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPEG, PNG, WebP and GIF images are allowed.");
  }

  const compressed = await compressImage(file);
  if (!compressed) {
    throw new Error(
      `Image is too large. After compression it still exceeds the 45 KB limit. Please use a smaller image.`
    );
  }
  return blobToDataURL(compressed);
};
