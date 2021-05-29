import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() {
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

  public dataURLtoFile(photoElement: { name: string, base64: string }): File {
    const arr = photoElement.base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const  bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], photoElement.name, {type: mime});
  }

  public filterIt(arr: Array<any>, searchKey: any): {} {
    return arr.filter(function(obj) {
      return Object.keys(obj).some(function(key) {
        return obj[key].includes(searchKey);
      });
    });
  }
}
