export const getDateString = (
  date,
  m = true,
  d = true,
  y = true,
  locale = "en-Us"
) => {
  return new Date(date).toLocaleDateString(locale, {
    month: m ? "short" : undefined,
    day: d ? "numeric" : undefined,
    year: y ? "numeric" : undefined,
  });
};
