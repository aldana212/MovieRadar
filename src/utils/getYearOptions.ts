export type YearOption = {
  label: string;
  value: number;
};

export function getYearOptions(from = 1990): YearOption[] {
  const currentYear = new Date().getFullYear();

  return Array.from(
    { length: currentYear - from + 1 },
    (_, i) => {
      const year = currentYear - i;

      return {
        label: String(year),
        value: year,
      };
    }
  );
}