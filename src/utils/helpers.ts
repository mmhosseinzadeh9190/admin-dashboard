export function daysUntil(deadlineString: string): number {
  const currentDate = new Date();
  const deadlineDate = new Date(deadlineString);
  const diffTime = deadlineDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function extractTime(dateString: string): string {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const isPM = hours >= 12;
  hours = hours % 12 || 12;
  const period = isPM ? "PM" : "AM";
  return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
}

export function isValidImage(url: string): string | boolean {
  const imagePattern = /\.(jpeg|jpg|gif|png|bmp|webp|svg|tiff|tif)$/i;
  const cleanUrl = url.split("?")[0];
  return cleanUrl && cleanUrl.length > 0 && imagePattern.test(cleanUrl);
}

export function capitalizeFirstLetter(input: string): string {
  if (input.length === 0) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}
