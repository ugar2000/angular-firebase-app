import {Injectable} from '@angular/core';
import {Product, ProductData} from '../models/product.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudProductService {

  private readonly pathUrl = environment.backHost + '/products/';

  constructor(private http: HttpClient) {
  }

  public createDocument(data: ProductData): Observable<any> {
    return this.http.put(this.pathUrl + 'set-product', data);
  }

  public getDocuments(): Observable<any> {
    return this.http.get(this.pathUrl);
  }

  public updateDocument(data: Product): Observable<any> {
    return this.http.put(this.pathUrl + 'set-product', data);
  }


  public deleteDocument(data: Product): Observable<any> {
    return this.http.delete(`${this.pathUrl}delete-product/${data.id}`);
  }

}

