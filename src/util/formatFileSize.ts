/**
 * ファイルサイズを適切な単位で表示するための関数。
 * サイズはバイト単位で、文字列か数値で渡される。
 * オプションとして、小数点以下何桁まで表示するか指定できる。
 *
 * @param {string | number} size - バイト単位のファイルサイズ。
 * @param [decimalPlaces=2] - 表示する小数点以下の桁数。
 * @return {string} フォーマットされたファイルサイズ。
 * @throws {Error} サイズが大きすぎる場合にエラーをスローする。
 */
export function formatFileSize(size: string | number, decimalPlaces = 2): string {
  const sizeInBytes = typeof size === 'string' ? parseInt(size.replace(/,/g, ''), 10) : size;
  const i = sizeInBytes == 0 ? 0 : Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (i > 8) {
    throw new Error('Size too large to format');
  }
  console.log(1);
  return parseFloat((sizeInBytes / Math.pow(1024, i)).toFixed(decimalPlaces)) + ' ' + sizes[i];
}
