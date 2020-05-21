import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  storeClient(data: any) {
    return this.http.post(environment.endPoint + 'Client/', data);
  }

  updateClient(data: any ,id: any) {
    return this.http.put<any>(environment.endPoint + 'Client/'+ id + '/',data );
  }

  deleteClient(id: Number): Observable<any> {
    return this.http.delete<any>(environment.endPoint + 'Client/' + id);
  }

  getClient(): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'Client/');
  }
  
  viewClient(id :any ): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'Client/' + id);
  }
  
}
