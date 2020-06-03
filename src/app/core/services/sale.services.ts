import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  storeSale(data: any) {
    return this.http.post(environment.endPoint + 'Sale/', data);
  }

  updateSale(data: any ,id: any) {
    return this.http.put<any>(environment.endPoint + 'Sale/'+ id , data);
  }

  deleteSale(id: Number): Observable<any> {
    return this.http.delete<any>(environment.endPoint + 'Sale/' + id);
  }

  getSale(): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'Sale/');
  }

  viewSale(id: any ): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'Sale/' + id);
  }
  
  storeFinalSale(data: any) {
    return this.http.post(environment.endPoint + 'FinalSale/', data);
  }

  updateFinalSale(data: any ,id: any) {
    return this.http.put<any>(environment.endPoint + 'FinalSale/'+ id + '/' , data);
  }

  deleteFinalSale(id: Number): Observable<any> {
    return this.http.delete<any>(environment.endPoint + 'FinalSale/' + id);
  }

  getFinalSale(): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'FinalSale/');
  }

  viewFinalSale(id: any ): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'FinalSale/' + id);
  }


    // Filter Api's
    saleHistory(data: any) {
      return this.http.post(environment.endPoint + 'SaleDetail/SaleFilter/', data);
    }

    salePendingOrders(data: any) {
      return this.http.post(environment.endPoint + 'SaleDetail/PendingOrders/', data);
    }

    changeOrderStatus(id: any) {
      return this.http.get(environment.endPoint + 'SaleDetail/' + id + '/GetSaleDetailRecipie/changeOrderStatus/');
    }
}
