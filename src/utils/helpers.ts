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
  const imagePattern = /\.(jpeg|jpg|png|webp)$/i;
  const cleanUrl = url.split("?")[0];
  return cleanUrl && cleanUrl.length > 0 && imagePattern.test(cleanUrl);
}

export function addDefaultSrc(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  type: "avatar" | "image",
) {
  if (type === "avatar") e.currentTarget.src = "/public/avatarPlaceholder.png";
  if (type === "image") e.currentTarget.src = "/public/imagePlaceholder.png";
}

export function capitalizeFirstLetter(input: string): string {
  if (input.length === 0) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function capitalizeAllFirstLetters(input: string): string {
  if (input.length === 0) return input;
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatISODateToCustomFormat(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayName = daysOfWeek[date.getUTCDay()];
  const day = String(date.getUTCDate()).padStart(2, "0");
  const monthName = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${dayName}, ${day} ${monthName} ${year}`;
}

export function generateUniqueId() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return timestamp + randomNum;
}

export async function urlToFile(url: string): Promise<File> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch the image.");
  }
  const blob = await response.blob();
  const mimeType = blob.type;
  const urlSegments = url.split("/");
  const lastSegment = urlSegments[urlSegments.length - 1];
  const filename = lastSegment.split(".")[0];
  return new File([blob], filename, { type: mimeType });
}

export function getUserDefaultTheme() {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const updateTheme = (theme: string | null) => {
  if (theme === null || theme === "auto") {
    const defaultTheme = getUserDefaultTheme();
    document.documentElement.classList = defaultTheme;
    localStorage.setItem("theme", "auto");
  } else {
    document.documentElement.classList = theme;
    localStorage.setItem("theme", theme);
  }
};
