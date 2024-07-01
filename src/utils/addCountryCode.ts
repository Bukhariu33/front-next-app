export const addCountryCode = (number: string) => {
  if (number.startsWith('0')) {
    return `+966${number.slice(1)}`;
  }
  return `+966${number}`;
};
