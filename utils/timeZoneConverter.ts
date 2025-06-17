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
