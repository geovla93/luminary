// import {Blockchain} from '../../types/blockchain';
import {INewsOverviewItem, NewsItem} from '@itypes/news';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface INewsPercentage {
  counts: {positivePercent: number; negativePercent: number};
  overview: null | INewsOverviewItem;
}
export interface INewsState {
  loading: boolean;
  loadingFeatured: boolean;
  featuredClosed: boolean;
  dismissed: number[];
  featured: NewsItem[];
  news: NewsItem[];
  opened: number[];
  overview: null | INewsOverviewItem;
  newsOverviewLastDismiss: string | null;
  newsOverviewLastChange: string | null;
  newsCount: {
    positivePercent: number;
    negativePercent: number;
  };
}

const initialState: INewsState = {
  loading: true,
  loadingFeatured: true,
  featuredClosed: false,
  dismissed: [],
  featured: [],
  news: [],
  opened: [],
  overview: null,
  newsOverviewLastDismiss: null,
  newsOverviewLastChange: null,
  newsCount: {
    positivePercent: 0,
    negativePercent: 0,
  },
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setFeaturedClosed(state, action: PayloadAction<boolean>) {
      state.featuredClosed = action.payload;
    },
    setNewsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setFeaturedLoading(state, action: PayloadAction<boolean>) {
      state.loadingFeatured = action.payload;
    },
    setNews(state, action: PayloadAction<NewsItem[]>) {
      state.news = action.payload;
      state.loading = false;
      // clear the open news from the list if are missing from the new list
      if (!state.opened) {
        state.opened = [];
      }
      state.opened = state.opened.filter(id =>
        state.news.find(n => n.id === id),
      );
    },
    setOpened(state, action: PayloadAction<number>) {
      state.opened.push(action.payload);
    },
    setNewsOverviewLastDismiss(state, action: PayloadAction<string>) {
      state.newsOverviewLastDismiss = action.payload;
    },
    setNewsOverviewLastChange(state, action: PayloadAction<string>) {
      state.newsOverviewLastChange = action.payload;
    },
    setFeatured(state, action: PayloadAction<NewsItem[]>) {
      state.featured = action.payload;
      state.loadingFeatured = false;
      state.featured = state.featured.filter(
        n => !state.dismissed.includes(n.id),
      );
      state.dismissed = state.dismissed.filter(id =>
        state.featured.find(n => n.id === id),
      );
    },
    dismissNewsAction(state, action: PayloadAction<number>) {
      state.dismissed.push(action.payload);
      state.featured = state.featured.filter(n => n.id !== action.payload);
    },
    setNewsCount(state, action: PayloadAction<INewsPercentage>) {
      state.newsCount = action.payload.counts;
      if (action.payload.overview) {
        state.overview = action.payload.overview;
        state.newsOverviewLastChange = dayjs().format('YYYY-MM-DD HH:mm:ss');
      }
    },
    resetNews(state) {
      state.loading = true;
      state.loadingFeatured = true;
      state.featuredClosed = false;
      state.featured = [];
      state.news = [];
      state.dismissed = [];
      state.opened = [];
      state.overview = null;
      state.newsOverviewLastDismiss = null;
      state.newsOverviewLastChange = null;
      state.newsCount = {
        positivePercent: 0,
        negativePercent: 0,
      };
    },
  },
});

export const {
  setNews,
  setFeatured,
  setNewsLoading,
  setFeaturedLoading,
  setFeaturedClosed,
  resetNews,
  dismissNewsAction,
  setOpened,
  setNewsCount,
  setNewsOverviewLastDismiss,
  setNewsOverviewLastChange,
} = newsSlice.actions;

export default newsSlice.reducer;
