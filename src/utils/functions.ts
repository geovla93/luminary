import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

export const getRelativeTime = (timestamp: number | string) => {
  // make our own relative time formatter, since dayjs's is broken

  // return dayjs(timestamp).fromNow();
  const now = dayjs();
  const then = dayjs(timestamp);
  const diff = now.diff(then, 'second');
  if (diff < 60) {
    return {
      value: diff,
      unit: 'seconds_ago',
    };
  }
  if (diff < 3600) {
    return {
      value: Math.floor(diff / 60),
      unit: 'minutes_ago',
    };
  }
  if (diff < 86400) {
    return {
      value: Math.floor(diff / 3600),
      unit: 'hours_ago',
    };
  }
  if (diff < 2592000) {
    return {
      value: Math.floor(diff / 86400),
      unit: 'days_ago',
    };
  }
  if (diff < 31104000) {
    return {
      value: Math.floor(diff / 2592000),
      unit: 'months_ago',
    };
  }
  return {
    value: Math.floor(diff / 31104000),
    unit: 'years_ago',
  };
};
export const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate random number
    let j = Math.floor(Math.random() * (i + 1));
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const randomNumbers = (max: number, length: number = 3) => {
  const arr = [];
  while (arr.length < length) {
    const r = Math.floor(Math.random() * max);
    if (arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }
  return arr;
};

export const formatAddress = (address: string) => {
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
};
