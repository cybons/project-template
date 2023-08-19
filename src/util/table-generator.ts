interface Properties {
  caption: string;
  firstRowIsHeader: boolean;
  firstColumnIsHeader: boolean;
}

interface CreateOptions {
  firstRowIsHeader: boolean;
  firstColumnIsHeader: boolean;
  numberOfHeaderColumns: number;
}

const defaultProperties: Properties = {
  caption: '',
  firstRowIsHeader: true,
  firstColumnIsHeader: true,
};

const defaultCreateOptions: CreateOptions = {
  firstRowIsHeader: true,
  firstColumnIsHeader: true,
  numberOfHeaderColumns: 1,
};

export class TableGenerator {
  private properties: Properties;

  /**
   * 新しいTableGeneratorインスタンスを作成します。
   * @param {Partial<Properties>} properties - テーブルのプロパティ。省略可能。
   *
   * propertiesオブジェクトの形式:
   * {
   *    caption: string;                // テーブルのキャプション。省略可能。
   *    firstRowIsHeader: boolean;      // 最初の行がヘッダーかどうか。省略可能。
   *    firstColumnIsHeader: boolean;   // 最初の列がヘッダーかどうか。省略可能。
   * }
   */
  constructor(properties: Partial<Properties> = {}) {
    this.properties = { ...defaultProperties, ...properties };
  }

  set setProperties(properties: Partial<Properties>) {
    this.properties = { ...this.properties, ...properties };
  }

  create(data: string[][], options: Partial<CreateOptions> = {}) {
    const { firstRowIsHeader, firstColumnIsHeader, numberOfHeaderColumns } = { ...defaultCreateOptions, ...options };
    let html = ``;

    if (this.properties.caption) {
      html += `<caption>${this.properties.caption}</caption>`;
    }

    data.forEach((row, rowIndex) => {
      let rowContent = '';
      row.forEach((cell, cellIndex) => {
        if ((firstRowIsHeader && rowIndex === 0) || (firstColumnIsHeader && cellIndex < numberOfHeaderColumns)) {
          rowContent += `<th>${cell}</th>`;
        } else {
          rowContent += `<td>${cell}</td>`;
        }
      });

      if (firstRowIsHeader && rowIndex === 0) {
        html += `<thead><tr>${rowContent}</tr></thead>`;
      } else {
        if (rowIndex === 1) html += `<tbody>`;
        html += `<tr>${rowContent}</tr>`;
        if (rowIndex === data.length - 1) html += `</tbody>`;
      }
    });

    html += `</table>`;
    const table = document.createElement('table');
    table.innerHTML = html;
    return table;
  }
}
