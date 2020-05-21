import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  storeProducts(data: any) {
    return this.http.post(environment.endPoint + 'Product/', data);
  }

  updateProducts(data: any ,id: any) {
    return this.http.put<any>(environment.endPoint + 'Product/'+ id + '/', data);
  }

  deleteProducts(id: Number): Observable<any> {
    return this.http.delete<any>(environment.endPoint + 'Product/' + id);
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'Product/');
  }

  viewProducts(id: any) {
    return this.http.get(environment.endPoint + 'Product/' + id);
  }

}
