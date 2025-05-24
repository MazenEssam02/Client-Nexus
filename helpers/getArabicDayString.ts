export const getArabicDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("ar-SA", { weekday: "long" });
};
