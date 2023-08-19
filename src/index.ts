import { formatFileSize } from './util/formatFileSize';
import { gasRun } from './util/gas';

console.log('hellow world');
console.log(formatFileSize(11233432, 2));
// alert(1);
class FileUploader {
  #container: HTMLElement;
  constructor(container: HTMLElement) {
    this.#container = container;
  }
}
async () => {
  const data = await gasRun('func1')(1, 2, 3);
  console.log(data);
};
