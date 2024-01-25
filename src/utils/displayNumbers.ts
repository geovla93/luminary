import {currencyPositions, currencySymbols} from 'src/blockchain/currencies';

interface CurrencyFormatterOptions {
  maxFractionDigits?: number;
  minFractionDigits?: number;
  decimalSeparator?: string;
  thousandSeparator?: string;
}
function position(
  currencyPosition: 'left' | 'right',
  currencySymbol: string,
  value: string,
): string {
  if (currencyPosition === 'left') {
    if (value.indexOf('-') === 0) {
      return `-${currencySymbol}${value.substring(1)}`;
    }
    return `${currencySymbol}${value}`;
  }

  return `${value} ${currencySymbol}`;
}

export const formatCurrency = (
  value: number | string,
  currencyCode: string = 'usd',
  options: CurrencyFormatterOptions = {},
): string => {
  const defaults: CurrencyFormatterOptions = {
    maxFractionDigits: 8,
    minFractionDigits: 2,
    decimalSeparator: ',',
    thousandSeparator: '.',
  };

  const settings = {...defaults, ...options};
  const currencyPosition = currencyPositions[currencyCode.toLowerCase()];
  if (value === 0 || value === null || value === undefined || value === '0') {
    return position(
      currencyPosition,
      currencySymbols[currencyCode.toLowerCase()] ?? currencyCode,
      '0,00',
    );
  }

  let numericValue: number =
    typeof value === 'string' ? parseFloat(value) : value;

  const currencyCheck = currencyCode.trim().toLowerCase();
  if (currencyCheck === 'idr' || currencyCheck === 'rp') {
    numericValue = Math.ceil(numericValue);
  }

  let valueFormatted;
  if (numericValue < 1 && numericValue > 0) {
    // Determină numărul de zecimale necesar pentru a afișa primele două cifre relevante
    const nonZeroDigits = numericValue
      .toString()
      .split('.')[1]
      .match(/^(0*)/)[0].length;
    const neededDigits = Math.min(
      nonZeroDigits + 2,
      settings.maxFractionDigits,
    );
    valueFormatted = numericValue.toFixed(neededDigits);
  } else {
    // Utilizează minFractionDigits pentru numere mai mari sau egale cu 1
    valueFormatted = numericValue.toFixed(settings.minFractionDigits);
  }

  let [integerPart, decimalPart] = valueFormatted.split('.');

  integerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    settings.thousandSeparator!,
  );

  valueFormatted = `${integerPart}${settings.decimalSeparator!}${decimalPart}`;

  const currencySymbol =
    currencySymbols[currencyCode.toLowerCase()] ?? currencyCode;

  return position(currencyPosition!, currencySymbol, valueFormatted);
};
interface BalanceFormatOptions {
  maxFractionDigits?: number; // maximum number of digits after decimal point
  useThousandSeparator?: boolean; // use thousand separator
  thousandSeparator?: string; // separator thousand
  decimalSeparator?: string; // separator decimal
}

export const formatBalance = (
  balance: number | string,
  options: BalanceFormatOptions = {},
): string => {
  const {
    maxFractionDigits = 8, // a common practice is to show 8 digits after decimal point
    useThousandSeparator = true,
    thousandSeparator = ',',
    decimalSeparator = '.',
  } = options;

  let numericBalance: number =
    typeof balance === 'string' ? parseFloat(balance) : balance;
  let formattedBalance = numericBalance.toFixed(maxFractionDigits);

  if (useThousandSeparator) {
    const parts = formattedBalance.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    formattedBalance = parts.join(decimalSeparator);
  }

  return formattedBalance;
};

export const calculateTokenPrice = (amount: number, price: number) => {
  return (amount * price).toFixed(2);
};

export const calculateTokenAmount = (amount: number, price: number) => {
  return price / amount;
};
