export interface i18nTitle {
  [key: string]: any;
}

export interface NewsItem {
  id: number;
  news_url: string;
  image_url: string;
  title: string;
  i18n_title: i18nTitle;
  text: string;
  source_name: string;
  date: string;
  topics: any;
  tickers: any;
  sentiment: string;
}

export interface INewsOverviewItem {
  icon: string;
  text: string;
  bgColor: string;
  textColor: string;
}

export interface INewsOverview {
  // add the rest of the responses
  perfect: INewsOverviewItem[];
}
