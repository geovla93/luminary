export interface i18nTitle {
  [key: string]: any;
}

export interface IDapp {
  id: number;
  url: string;
  image: string;
  featuredImage?: string;
  name: string;
  description: string;
  categories: string[];
  rating: number;
}
