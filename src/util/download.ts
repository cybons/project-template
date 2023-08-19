import { formatDate } from './html-util';

export class Download {
  #newlineCode;
  #encoding;
  constructor(newlineCode: '\r\n' | '\r' | '\n' = '\r\n', encoding: 'utf-8' | 'Shift_JIS' | 'utf-8_sig' = 'utf-8') {
    this.#newlineCode = newlineCode;
    this.#encoding = encoding;
  }

  async csv(data: string, filename = '') {
    filename = filename || `file_${formatDate(new Date(), 'yyyyMMdd_HHmmSSS')}.csv`;
    const blob = new Blob([data], { type: `text/csv;charset=${this.#encoding}` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    await sleep(100);
    link.remove();
  }
  async json(data: string, filename = '') {
    filename = filename || `file_${formatDate(new Date(), 'yyyyMMdd_HHmmSSS')}.json`;
    const blob =
      this.#encoding === 'utf-8_sig'
        ? new Blob([new Uint8Array([239, 187, 191]), data], { type: `text/csv;charset=UTF-8` })
        : new Blob([data], { type: `application/json;charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    await sleep(100);
    link.remove();
  }
}
