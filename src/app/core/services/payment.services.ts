import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  storePayments(data: any) {
    return this.http.post(environment.endPoint + 'Payment/', data);
  }

  updatePayments(data: any ,id: any) {
    return this.http.put<any>(environment.endPoint + 'Payment/'+ id + '/',data );
  }

  deletePayments(id: Number): Observable<any> {
    return this.http.delete<any>(environment.endPoint + 'Payment/' + id);
  }

  getPayments(): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'Payment/');
  }

  viewPayments(id: any): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'Payment/' + id);
  }

  // filter Payment Api

  paymentDetailFilter(data: any) {
    return this.http.post(environment.endPoint + 'PaymentDetailFilter/PaymentFilter/', data);
  }

}
