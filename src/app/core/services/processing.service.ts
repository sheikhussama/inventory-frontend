import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  //   deleteMaterial(id: Number): Observable<any> {
  //     return this.http.delete<any>(environment.endPoint + 'RawMaterial/' + id);
  //   }

  //   getMaterial(): Observable<any> {
  //     return this.http.get<any>(environment.endPoint + 'RawMaterial/');
  //   }

  //   viewMaterial(id: any): Observable<any> {
  //     return this.http.get<any>(environment.endPoint + 'RawMaterial/' + id);
  //   }


  //  raw 

  storeRaw(data: any) {
    return this.http.post(environment.endPoint + 'RawRecipieCRUD/', data);
  }

  filterRaw(data: any) {
    return this.http.post(environment.endPoint + 'SaleDetail/RecipieDetailFilter/', data);
  }

}
