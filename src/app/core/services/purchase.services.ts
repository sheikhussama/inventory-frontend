import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  storePurchase(data: any) {
    return this.http.post(environment.endPoint + 'Purchase/', data);
  }

  updatePurchase(data: any ,id: any) {
    return this.http.put<any>(environment.endPoint + 'Purchase/'+ id ,data);
  }

  deletePurchase(id: Number): Observable<any> {
    return this.http.delete<any>(environment.endPoint + 'Purchase/' + id);
  }

  getPurchase(): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'Purchase/');
  }
  
  viewPurchase(id: any ): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'Purchase/' + id);
  }
  

  // Filter Api's
  purchasefinishGoodsFilter(data: any) {
    return this.http.post(environment.endPoint + 'PurchaseFilter/FinishGoods/', data);
  }

  purchaseRawFilter(data: any) {
    return this.http.post(environment.endPoint + 'PurchaseFilter/RawPurchse/', data);
  }
}
