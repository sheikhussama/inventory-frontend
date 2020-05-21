import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinishGoodsService {

  constructor(private http: HttpClient) { }

  storefinishGoods(data: any) {
    return this.http.post(environment.endPoint + 'RawMaterialPurchase/', data);
  }

  updatefinishGoods(data: any ,id: any) {
    return this.http.put<any>(environment.endPoint + 'RawMaterialPurchase/'+ id + '/' ,data);
  }

  deletefinishGoods(id: Number): Observable<any> {
    return this.http.delete<any>(environment.endPoint + 'RawMaterialPurchase/' + id);
  }

  getfinishGoods(): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'RawMaterialPurchase/');
  }
  
  viewfinishGoods(id: any ): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'RawMaterialPurchase/' + id);
  }
  
}
