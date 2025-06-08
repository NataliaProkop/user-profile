export const resizeAndConvertToBase64 = async (
  file: Blob,
  maxWidth: number,
  maxHeight: number,
  quality = 0.7
): Promise<string> => {
  // Load image from blob/file
  const loadImage = (blob: Blob): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };

      img.src = url;
    });

  const img = await loadImage(file);

  // Calculate new size preserving aspect ratio
  let { width, height } = img;
  if (width > maxWidth) {
    height = (maxWidth / width) * height;
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = (maxHeight / height) * width;
    height = maxHeight;
  }

  // Draw to canvas and compress
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");

  ctx.drawImage(img, 0, 0, width, height);

  // Return compressed base64 string (JPEG)
  return canvas.toDataURL("image/jpeg", quality);
};

export const converBase64ToFile = (
  base64: string,
  filename: string,
  mimeType: string
): File => {
  const arr = base64.split(",");
  const byteString = atob(arr[1]);
  const mime =
    mimeType || arr[0].match(/:(.*?);/)?.[1] || "application/octet-stream";

  const byteNumbers = new Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], filename, { type: mime });
};
