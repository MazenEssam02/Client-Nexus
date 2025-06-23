import { easternArabicNumeralFormatter } from "../components/ArCalendar/ArCalendar";

const timeZoneConverter = (date) => {
  const dateStr = date.endsWith("Z") ? date : date + "Z";
  const time = new Date(dateStr).toLocaleTimeString("ar-SA", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Cairo",
  });
  return time;
};
export default timeZoneConverter;

export const convertDurationToReadableFormat = (duration) => {
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  if (hours > 0) {
    if (minutes > 0) {
      return `${easternArabicNumeralFormatter.format(hours)} ساعة و ${easternArabicNumeralFormatter.format(minutes)} دقيقة`;
    }
    return `${easternArabicNumeralFormatter.format(hours)} ساعة`;
  }
  if (minutes > 0) {
    return `${easternArabicNumeralFormatter.format(minutes)} دقيقة`;
  }
  return `${easternArabicNumeralFormatter.format(seconds)} ثانية`;
};