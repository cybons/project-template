/**
 * 文字列比較クラス
 */
export class StringComparator {
  private str1: string;
  private str2: string;

  /**
   * @param {string} str1 - 比較する文字列1
   * @param {string} str2 - 比較する文字列2
   */
  constructor(str1: string, str2: string) {
    this.str1 = str1;
    this.str2 = str2;
  }

  /**
   * 文字列を比較します。
   * @param exactMatch - 完全一致のみを比較するかどうか
   * @returns {Object} 比較結果オブジェクト。isMatchは一致したかどうか、messageは比較結果のメッセージ、levelは結果の警告レベルを示します。
   */
  compare(exactMatch = true): { isMatch: boolean; message: string; level: string } {
    // 両方の文字列が完全に一致する
    if (this.str1 === this.str2) {
      return {
        isMatch: true,
        message: '完全一致',
        level: 'info',
      };
    }

    // exactMatchがtrueの場合、ここで比較を終了する
    if (exactMatch) {
      return {
        isMatch: false,
        message: '一致しない',
        level: 'error',
      };
    }

    // 末尾の改行位置だけが異なり、それ以外は同じ
    const str1Stripped = this.str1.replace(/\n+$/, '');
    const str2Stripped = this.str2.replace(/\n+$/, '');
    if (str1Stripped === str2Stripped) {
      return {
        isMatch: true,
        message: '末尾の改行位置が異なるが、それ以外は一致',
        level: 'warning',
      };
    }

    // それ以外の場合、一致しない
    return {
      isMatch: false,
      message: '一致しない',
      level: 'error',
    };
  }
}

// 使用例
const str1 = 'Hello, World!\n';
const str2 = 'Hello, World!';

const comparator = new StringComparator(str1, str2);
const result = comparator.compare(false);
console.log(result);
// { isMatch: true, message: '末尾の改行位置が異なるが、それ以外は一致', level: 'warning' }
