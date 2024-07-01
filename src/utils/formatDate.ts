export const formatDate = (date?: string) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString('en-gb', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};
