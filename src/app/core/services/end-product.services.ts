
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EndProductService {
    constructor(private http: HttpClient) { }

      storeEndProducts(data: any) {
        return this.http.post(environment.endPoint + 'EndProduct/', data);
      }
    
      updateEndProducts(data: any ,id: any) {
        return this.http.put<any>(environment.endPoint + 'EndProduct/'+ id + '/', data);
      }
    
      deleteEndProducts(id: Number): Observable<any> {
        return this.http.delete<any>(environment.endPoint + 'EndProduct/' + id);
      }
    
      getEndProducts(): Observable<any> {
        return this.http.get<any>(environment.endPoint + 'EndProduct/');
      }
    
      viewEndProducts(id: any) {
        return this.http.get(environment.endPoint + 'EndProduct/' + id);
      }
}



