import { formatDate } from './html-util';

export class Days {
  #now;
  constructor() {
    this.#now = new Date();
  }

  tomorrow(just = false) {
    this.#now.setDate(this.#now.getDate() + 1);
    this.#now = just ? this.#justTime(this.#now) : this.#now;
    return this;
  }
  yesterday(just = false) {
    this.#now.setDate(this.#now.getDate() - 1);
    this.#now = just ? this.#justTime(this.#now) : this.#now;
    return this;
  }
  dateAdd(type: 'Y' | 'M' | 'D' = 'D', cnt = 1) {
    switch (type) {
      case 'D':
        this.#now.setDate(this.#now.getDate() + cnt);
        break;
      case 'Y':
        this.#now.setFullYear(this.#now.getFullYear() + cnt);
        break;
      case 'M':
        this.#now.setMonth(this.#now.getMonth() + cnt);
        break;
    }
    return this;
  }
  dateSubtract(type: 'Y' | 'M' | 'D' = 'D', cnt = 1) {
    this.dateAdd(type, -cnt);
    return this;
  }
  format(format = '') {
    return formatDate(this.#now, format);
  }

  #justTime(time: Date) {
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    return time;
  }
}
