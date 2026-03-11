export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.png";

  // if already full url
  if (imagePath.startsWith("http")) return imagePath;

  return `https://caviro-backend.onrender.com${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};