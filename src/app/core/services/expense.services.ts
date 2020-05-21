import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  storeExpense(data: any) {
    return this.http.post(environment.endPoint + 'Expense/', data);
  }

  updateExpense(data: any ,id: any) {
    return this.http.put<any>(environment.endPoint + 'Expense/'+ id + '/', data);
  }

  deleteExpense(id: Number): Observable<any> {
    return this.http.delete<any>(environment.endPoint + 'Expense/' + id);
  }

  getExpense(): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'Expense/');
  }
  
  viewExpense(id: any): Observable<any> {
    return this.http.get<any>(environment.endPoint + 'Expense/' + id);
  }
}
