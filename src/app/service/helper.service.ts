import {Injectable} from '@angular/core';
import {FileInput} from 'ngx-material-file-input';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() {
  }

  public indexOfInFileInput(fileInput: FileInput, findFile: File): number {
    return fileInput.files.findIndex((elem) => {
      return elem.name === findFile.name;
    });
  }

  public fileToBase64(file: File): Promise<any> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = (event) => {

        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  public fileRead(file: File): Promise<any> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = (event) => {

        resolve(event.target.result);
      };
      reader.readAsText(file);
    });
  }

  public dataURLtoFile(name: string, base64: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], name, {type: mime});
  }

  public filterIt(arr: Array<any>, searchKey: any): {} {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].includes(searchKey);
      });
    });
  }
}
