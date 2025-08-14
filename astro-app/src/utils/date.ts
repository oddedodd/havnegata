/**
 * Format a date string into a readable format
 * @param dateString - ISO date string from Sanity
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) return "";

  // Format as Norwegian date (e.g., "15. januar 2024")
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("nb-NO", options);
}
