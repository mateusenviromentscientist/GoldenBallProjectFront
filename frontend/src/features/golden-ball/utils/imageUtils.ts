export function resolveImageSrc(image: string | null, fallback: string): string {
  if (!image) return fallback;
  if (image.startsWith('data:')) return image;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  // Everything else (including JPEG base64 that starts with /9j/) is raw base64
  return `data:image/jpeg;base64,${image}`;
}
