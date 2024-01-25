class IntervalManager {
  intervals: {[key: string]: NodeJS.Timeout};
  constructor() {
    this.intervals = {};
  }

  setInterval(name: string, callback: () => void, interval: number) {
    if (this.intervals[name]) {
      clearInterval(this.intervals[name]);
    }
    this.intervals[name] = setInterval(callback, interval);
  }

  clearInterval(name: string) {
    if (this.intervals[name]) {
      clearInterval(this.intervals[name]);
      delete this.intervals[name];
    }
  }

  clearAllIntervals() {
    for (const name in this.intervals) {
      clearInterval(this.intervals[name]);
    }
    this.intervals = {};
  }
}

const intervalManager = new IntervalManager();

export default intervalManager;
