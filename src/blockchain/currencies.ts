export enum CURRENCIES {
  BTC = 'btc',
  USD = 'usd',
  AED = 'aed',
  AUD = 'aud',
  BRL = 'brl',
  CAD = 'cad',
  CHF = 'chf',
  CNY = 'cny',
  // DKK = 'dkk',
  EUR = 'eur',
  GBP = 'gbp',
  JPY = 'jpy',
  // NOK = 'nok',
  PHP = 'php',
  PLN = 'pln',
  RUB = 'rub',
  // RON = 'ron',
  SAR = 'sar',
  SEK = 'sek',
  SGD = 'sgd',
  TRY = 'try',
  TWD = 'twd',
}

export interface ICurrency {
  name: string;
  currency: CURRENCIES;
}

export const currencies: ICurrency[] = [
  {name: 'Bitcoin', currency: CURRENCIES.BTC},
  {name: 'US Dollar', currency: CURRENCIES.USD},
  {name: 'UAE Dirham', currency: CURRENCIES.AED},
  {name: 'Australian Dollar', currency: CURRENCIES.AUD},
  {name: 'Brazilian Real', currency: CURRENCIES.BRL},
  {name: 'Canadian Dollar', currency: CURRENCIES.CAD},
  {name: 'Swiss Franc', currency: CURRENCIES.CHF},
  {name: 'Chinese Yuan', currency: CURRENCIES.CNY},
  // {name: 'Danish Krone', currency: CURRENCIES.DKK},
  {name: 'Euro', currency: CURRENCIES.EUR},
  {name: 'British Pound Sterling', currency: CURRENCIES.GBP},
  {name: 'Japanese Yen', currency: CURRENCIES.JPY},
  // {name: 'Norwegian Krone', currency: CURRENCIES.NOK},
  {name: 'Philippine Peso', currency: CURRENCIES.PHP},
  {name: 'Polish Zloty', currency: CURRENCIES.PLN},
  {name: 'Russian Ruble', currency: CURRENCIES.RUB},
  // {name: 'Romanian Leu', currency: CURRENCIES.RON},
  {name: 'Saudi Riyal', currency: CURRENCIES.SAR},
  {name: 'Swedish Krona', currency: CURRENCIES.SEK},
  {name: 'Singapore Dollar', currency: CURRENCIES.SGD},
  {name: 'Turkish Lira', currency: CURRENCIES.TRY},
  {name: 'Taiwan Dollar', currency: CURRENCIES.TWD},
];

export const currencySymbols: {[key: string]: string} = {
  btc: '₿', // Bitcoin
  usd: '$', // US Dollar
  aed: 'د.إ', // UAE Dirham
  aud: 'A$', // Australian Dollar
  brl: 'R$', // Brazilian Real
  cad: 'C$', // Canadian Dollar
  chf: 'CHF', // Swiss Franc
  cny: '¥', // Chinese Yuan
  eur: '€', // Euro
  gbp: '£', // British Pound
  jpy: '¥', // Japanese Yen
  php: '₱', // Philippine Peso
  pln: 'zł', // Polish Zloty
  rub: '₽', // Russian Ruble
  // ron: 'lei', // Romanian Leu
  sar: '﷼', // Saudi Riyal
  sek: 'kr', // Swedish Krona
  sgd: 'S$', // Singapore Dollar
  try: '₺', // Turkish Lira
  twd: 'NT$', // New Taiwan Dollar
};

export const currencyPositions: Record<string, 'left' | 'right'> = {
  btc: 'left', // Bitcoin
  usd: 'left', // US Dollar
  aed: 'right', // UAE Dirham
  aud: 'left', // Australian Dollar
  brl: 'left', // Brazilian Real
  cad: 'left', // Canadian Dollar
  chf: 'right', // Swiss Franc
  cny: 'left', // Chinese Yuan
  eur: 'right', // Euro
  gbp: 'left', // British Pound
  jpy: 'left', // Japanese Yen
  php: 'left', // Philippine Peso
  pln: 'right', // Polish Zloty
  rub: 'right', // Russian Ruble
  // ron: 'right', // Romanian Leu
  sar: 'right', // Saudi Riyal
  sek: 'right', // Swedish Krona
  sgd: 'left', // Singapore Dollar
  try: 'right', // Turkish Lira
  twd: 'left', // New Taiwan Dollar
};
