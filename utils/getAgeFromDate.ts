export default function getAge(dateString) {
  const birthDate = new Date(dateString); // Convert the birth date string to a Date object

  // Check for invalid date (e.g., "invalid date", "null", or malformed strings)
  if (isNaN(birthDate.getTime())) {
    console.error("Invalid date string provided:", dateString);
    return null; // Or throw an error, or return -1
  }

  const today = new Date(); // Get the current date

  let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the difference in years

  // Adjust age if the birthday hasn't occurred yet this year
  const monthDifference = today.getMonth() - birthDate.getMonth(); // Difference in months (0 for Jan, 1 for Feb, etc.)

  // If current month is less than birth month, birthday hasn't passed.
  // OR if current month is the same as birth month, but current day is less than birth day, birthday hasn't passed.
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--; // Subtract 1 from the age because the full year hasn't completed yet
  }

  return age;
}
