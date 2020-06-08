import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessingService {

  constructor(private http: HttpClient) { }

  //  reciepe
  storeRecipe(data: any) {
    return this.http.post(environment.endPoint + 'RecipieDetailCRUD/', data);
  }

  filterRecipe(data: any) {
    return this.http.post(environment.endPoint + 'SaleDetail/RawRecipieDetailFilter/', data);
  }


  viewRawRecipeDetail(id: any): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'SaleDetail/' + id + '/GetSaleDetailRecipie/SaleDetailWithRecipie');
  }

  //  raw 

  storeRaw(data: any) {
    return this.http.post(environment.endPoint + 'RawRecipieCRUD/', data);
  }

  filterRaw(data: any) {
    return this.http.post(environment.endPoint + 'SaleDetail/RecipieDetailFilter/', data);
  }
  filterRawFinishGoods(data: any) {
    return this.http.post(environment.endPoint + 'SaleDetail/RawRecipieDetailFilter/', data);
  }
  // Update

  updateFinishGoods(data: any) {
    return this.http.post(environment.endPoint + 'FinishGoodsUpdate/', data);
  }

  updateRawMaterial(data: any) {
    return this.http.post(environment.endPoint + 'RawMaterialUpdate/', data);
  }

}
