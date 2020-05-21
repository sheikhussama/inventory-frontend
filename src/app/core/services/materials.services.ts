import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {

  constructor(private http: HttpClient) { }

  storeMaterial(data: any) {
    return this.http.post(environment.endPoint + 'RawMaterial/', data);
  }

  updateMaterial(data: any ,id: any) {
    return this.http.put<any>(environment.endPoint + 'RawMaterial/' + id + '/',data);
  }

  deleteMaterial(id: Number): Observable<any> {
    return this.http.delete<any>(environment.endPoint + 'RawMaterial/' + id);
  }

  getMaterial(): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'RawMaterial/');
  }

  viewMaterial(id: any): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'RawMaterial/' + id);
  }
}
