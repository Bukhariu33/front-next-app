export const formatPhoneNumber = (input: string) => {
  if (!input) return input;
  let phoneNumber = input.replace(/[^\d]/g, '');
  if (phoneNumber.startsWith('966')) {
    phoneNumber = phoneNumber.slice(3);
  }
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
    3,
    6,
  )}-${phoneNumber.slice(6, 10)}`;
};
