import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private readonly pathUrl = environment.backHost + '/form/';

  constructor(private http: HttpClient) {
  }

  getProductFormTemplate(): Observable<any> {
    return this.http.get(this.pathUrl + 'product-template');
  }


}
