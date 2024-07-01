export function formatDateTime(inputDate: Date): string {
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const hours = String(inputDate.getHours() % 12).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');
  const seconds = String(inputDate.getSeconds()).padStart(2, '0');
  const amPm = inputDate.getHours() >= 12 ? 'PM' : 'AM';

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${amPm}`;

  return formattedDate;
}
