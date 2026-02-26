export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.png";

  // if already full url
  if (imagePath.startsWith("http")) return imagePath;

  return `http://localhost:5000${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};