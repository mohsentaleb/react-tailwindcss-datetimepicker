export const createYears = (userDefinedYears?: [number, number], descendingYears?: boolean) => {
  const years = [];
  const currentYear = new Date().getFullYear();
  const defaultStartYear = 1900;

  if (!userDefinedYears) {
    for (let year = defaultStartYear; year <= currentYear; year++) {
      years.push(year);
    }
  } else {
    const [start, end] = userDefinedYears;
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
  }

  return descendingYears === false ? years : years.reverse();
};
