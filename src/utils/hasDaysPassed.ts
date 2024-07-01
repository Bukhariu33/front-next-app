/**
 *
 * @param investmentDate  - Date of investment
 * @param days  - Number of days
 * @returns  - Boolean
 */
export default function hasDaysPassed(
  investmentDate: Date,
  days: number,
): boolean {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - investmentDate.getTime();
  const daysInMilliseconds = days * 24 * 60 * 60 * 1000;
  return timeDifference >= daysInMilliseconds;
}
