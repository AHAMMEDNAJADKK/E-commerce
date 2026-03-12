export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.png";

  // if already full url
  if (imagePath.startsWith("http")) return imagePath;

  return `${import.meta.env.VITE_API_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};