export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number,
): (...args: Parameters<F>) => void {
  let timeoutID: NodeJS.Timeout | null = null;

  return (...args: Parameters<F>) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
