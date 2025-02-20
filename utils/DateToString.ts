export default function DateToString(dateString) {
  const date = new Date(dateString.replace(/\//g, "-")); // Ensure compatibility
  const formattedDate = new Intl.DateTimeFormat("ar-EG", {
    day: "2-digit",
    month: "long",
  }).format(date);
  return formattedDate;
}
