export const converImgToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      resolve(e.target?.result as string);
    });
    reader.readAsDataURL(blob);
    reader.onerror = () => {
      reject(new Error("Unable to read file."));
    };
  });
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
