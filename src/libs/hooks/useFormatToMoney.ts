import useLanguage from './useLanguage';

export const formatToMoney = (_amount: number, language?: 'ar' | 'en') => {
  const currency: Currency = language === 'ar' ? 'رس' : 'SAR';

  const amount = Number.isNaN(_amount) ? 0 : _amount;

  const maximumFractionDigits = Number.isInteger(amount) ? 0 : 2;

  // Create an object with options
  const options: Intl.NumberFormatOptions = {
    maximumFractionDigits,
  };

  // Create the number format
  const numberFormat = new Intl.NumberFormat(undefined, options);

  // Format the amount
  const formattedAmount = numberFormat.format(amount);

  return `${formattedAmount} ${currency}`;
};

type Currency = 'رس' | 'SAR';
const useFormatToMoney = () => {
  const { language } = useLanguage();

  return { format: (amount: number) => formatToMoney(amount, language) };
};

export default useFormatToMoney;
