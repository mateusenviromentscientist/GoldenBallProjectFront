export function resolveImageSrc(image: string | null, fallback: string): string {
  if (!image) return fallback;
  if (image.startsWith('data:') || image.startsWith('http') || image.startsWith('/')) {
    return image;
  }
  // Raw base64 string — prefix with JPEG data URL
  return `data:image/jpeg;base64,${image}`;
}
