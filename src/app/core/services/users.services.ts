import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   
  apiend: string = 'UserDetails' 
  constructor(private http: HttpClient) { }

  storeUser(data: any) {
    return this.http.post(environment.endPoint + this.apiend + '/SignUp/', data);
  }

  getUser() {
    return this.http.get(environment.endPoint + this.apiend + '/GetUserList/');
  }
  
  deleteUser(id: any) {
    return this.http.post(environment.endPoint + this.apiend +'/DeleteUser/',id);
  }

  isActiveUser() {
    return this.http.get(environment.endPoint + this.apiend + '/IsActive/');
  }

  checkUsername(data: any) {
    return this.http.post(environment.endPoint + this.apiend + '/CheckUsername/', data);
  }

  changePassword(data: any) {
    return this.http.put(environment.endPoint + this.apiend + '/ChangePassword/', data);
  }
}
