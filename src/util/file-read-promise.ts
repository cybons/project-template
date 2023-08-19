interface Int8ArrayFile {
  fileName: string;
  data: number[];
  mimeType: string;
  size: number;
  lastModified: number;
}
interface OriginFile {
  fileName: string;
  data: string;
  mimeType: string;
  size: number;
  lastModified: number;
}
export class FileReadPromise {
  public files: FileList;

  constructor(files: FileList) {
    this.files = files;
  }

  readAsInt8Array(file: File): Promise<Int8ArrayFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', event => {
        const target = event.target;

        // event.targetがnullまたはundefinedだった場合、エラーを投げます
        // これは読み込み結果が存在しないことを示します
        if (!target) {
          reject(new Error('fileReaderが読み取れません'));
          return;
        }

        // 読み込みが成功した場合、その結果とともにPromiseをresolveします
        // ここでのtarget.resultはArrayBuffer型として扱われます
        resolve({
          fileName: file.name,
          data: [...new Int8Array(target.result as ArrayBuffer)],
          mimeType: file.type,
          size: file.size,
          lastModified: file.lastModified,
        });
      });

      reader.addEventListener('error', error => {
        reject(error);
      });

      reader.readAsArrayBuffer(file);
    });
  }
  readAsText(file: File): Promise<OriginFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', event => {
        const target = event.target;

        // event.targetがnullまたはundefinedだった場合、エラーを投げます
        // これは読み込み結果が存在しないことを示します
        if (!target) {
          reject(new Error('fileReaderが読み取れません'));
          return;
        }

        // 読み込みが成功した場合、その結果とともにPromiseをresolveします
        resolve({
          fileName: file.name,
          data: target.result as string,
          mimeType: file.type,
          size: file.size,
          lastModified: file.lastModified,
        });
      });

      reader.addEventListener('error', error => {
        reject(error);
      });

      reader.readAsText(file);
    });
  }

  readMultipleFiles(): Promise<Array<{ fileName: string; data: string }>> {
    const filePromises = Array.from(this.files).map(file => this.readAsText(file));
    return Promise.all(filePromises);
  }
}

// Usage example
// const inputElement = document.getElementById('input') as HTMLInputElement;

// inputElement.addEventListener('change', async event => {
//   const files = (event.target as HTMLInputElement).files!;
//   const fileReader = new FileReadPromise(files);

//   try {
//     const fileData = await fileReader.readMultipleFiles();
//     console.log(fileData);
//   } catch (error) {
//     console.error('Error reading files:', error);
//   }
// });
