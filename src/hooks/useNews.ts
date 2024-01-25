import {INewsOverview, INewsOverviewItem, NewsItem} from '@itypes/news';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {
  dismissNewsAction,
  setFeatured,
  setNews,
  setNewsCount,
  setNewsOverviewLastDismiss,
  setOpened,
} from '@redux/slices/news.slice';
import {getFeatured, getNewsByToken} from 'src/api/news';
import {getNews} from '../api/news';
import {googleTranslateLanguages} from '../i18n/index';
import {openLink} from '@utils/inAppBrowser';
import dayjs from 'dayjs';
import {useMemo} from 'react';

interface INewsContext {
  loading: boolean;
  loadingFeatured: boolean;
  overview: INewsOverviewItem | null;
  newsCount: {positivePercent: number; negativePercent: number};
  featured: NewsItem[];
  news: NewsItem[];
  opened: number[];
  dismissOverview: () => void;
  getFeaturedNews: () => void;
  getNewsData: (search: string) => Promise<any>;
  translatedTitle: (news: any) => string;
  getTokenNews: (token: string) => Promise<any>;
  dismissNews: (id: number) => void;
  onOpenNews: (id: number) => void;
  openNews: (url: string, id: number) => void;
}

const newsOverviewConfig: INewsOverview = {
  perfect: [
    {
      icon: require('../assets/news/jackpot.png'),
      text: 'breg_news_vg_0',
      bgColor: '#E5BC46',
      textColor: '#221F1A',
    },
    {
      icon: require('../assets/news/ai.png'),
      text: 'breg_news_vg_1',
      bgColor: '#221F1A',
      textColor: '#FCF0C7',
    },
    {
      icon: require('../assets/news/ai.png'),
      text: 'breg_news_vg_2',
      bgColor: '#E5BC46',
      textColor: '#221F1A',
    },
    {
      icon: require('../assets/news/GN.png'),
      text: 'breg_news_vg_3',
      bgColor: '#FCF0C7',
      textColor: '#221F1A',
    },
    {
      icon: require('../assets/news/uptrend.png'),
      text: 'breg_news_vg_4',
      bgColor: '#E5BC46',
      textColor: '#221F1A',
    },
  ],
};

const useNews = (): INewsContext => {
  const dispatch = useAppDispatch();
  const {locale} = useAppSelector(state => state.application);
  const {
    featured,
    loading,
    loadingFeatured,
    overview,
    news,
    opened,
    newsCount,
    newsOverviewLastChange,
    newsOverviewLastDismiss,
  } = useAppSelector(state => state.news);

  const getFeaturedNews = () => {
    getFeatured().then(res => {
      dispatch(setFeatured(res.data));
    });
  };

  const shouldDisplayOverview = (
    positive: number,
  ): INewsOverviewItem | null => {
    // change once per hour
    if (
      !newsOverviewLastChange ||
      dayjs().diff(newsOverviewLastChange, 'h') > 0
    ) {
      if (positive >= 70) {
        const random = Math.floor(
          Math.random() * newsOverviewConfig.perfect.length,
        );
        return newsOverviewConfig.perfect[random];
      }
    }
    return null;
  };

  const overviewDisplay = useMemo(() => {
    const isDismissedToday =
      newsOverviewLastDismiss &&
      dayjs().diff(newsOverviewLastDismiss, 'd') === 0;
    if (isDismissedToday) {
      return null;
    }
    return overview;
  }, [overview, newsOverviewLastDismiss]);

  const newsCallback = (_news: NewsItem[]) => {
    const positive = _news.filter(
      (item: NewsItem) => item.sentiment === 'Positive',
    ).length;
    const negative = _news.filter(
      (item: NewsItem) => item.sentiment === 'Negative',
    ).length;

    const total = positive + negative;

    const positivePercent = (positive / total) * 100;
    dispatch(
      setNewsCount({
        counts: {
          positivePercent,
          negativePercent: 100 - positivePercent,
        },
        overview: shouldDisplayOverview(positivePercent),
      }),
    );
  };

  const getNewsData = (search: string = '') => {
    return new Promise(resolve => {
      getNews(search)
        .then(res => {
          dispatch(setNews(res.data));
          newsCallback(res.data);
          resolve(res.data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  };

  const onOpenNews = (id: number) => {
    dispatch(setOpened(id));
  };

  const getTokenNews = (token: string) => {
    return getNewsByToken(token);
  };

  const translatedTitle = (n: NewsItem) => {
    //@ts-ignore
    if (n.i18n_title[googleTranslateLanguages[locale]]) {
      //@ts-ignore
      return n.i18n_title[googleTranslateLanguages[locale]];
    }
    return n.title;
  };

  const dismissOverview = () => {
    dispatch(setNewsOverviewLastDismiss(dayjs().format('YYYY-MM-DD HH:mm:ss')));
  };

  const openNews = (url: string, id: number) => {
    setTimeout(() => {
      onOpenNews(id);
    }, 1000);
    openLink(
      locale === 'en'
        ? url
        : //@ts-ignore
          `https://translate.google.com/translate?sl=auto&tl=${googleTranslateLanguages[locale]}&u=${url}`,
      locale === 'en' ? {readerMode: true} : {readerMode: false},
    );
  };

  const dismissNews = (id: number) => {
    dispatch(dismissNewsAction(id));
  };

  return {
    overview: overviewDisplay,
    newsCount,
    featured,
    loading,
    loadingFeatured,
    news,
    opened,
    translatedTitle,
    getFeaturedNews,
    getNewsData,
    getTokenNews,
    dismissNews,
    onOpenNews,
    openNews,
    dismissOverview,
  };
};

export default useNews;
