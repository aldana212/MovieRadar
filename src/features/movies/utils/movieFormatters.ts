export const formatMoney = (
  amount: number
) => {
  if (!amount) return "Not available";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
};

export const formatPopularity = (
  popularity: number
) => {
  return popularity.toFixed(1);
};

export const formatRuntime = (
  runtime: number
) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (!hours) return `${minutes}m`;

  return `${hours}h ${minutes}m`;
};

export const formatDate = (
  date: string
) => {
  return new Date(date).toLocaleDateString(
    "es-CO",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};