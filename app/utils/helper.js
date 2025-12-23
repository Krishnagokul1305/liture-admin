function formatDateTime(isoString) {
  const dateObj = new Date(isoString);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long", // e.g., "Thursday"
    year: "numeric",
    month: "long", // e.g., "February"
    day: "numeric",
  }).format(dateObj);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(dateObj);

  return {
    date: formattedDate, // "Thursday, February 27, 2025"
    time: formattedTime, // "05:37:58 AM"
  };
}

export { formatDateTime };
