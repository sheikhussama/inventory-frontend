import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ,private cookie: CookieService) { }

  login(data: any) {
    return this.http.post(environment.endPoint + 'login/', data);
  }

  isLoggedIn() {
    return this.cookie.check('accessToken');
  }

  logout() {
    // remove user from local storage to log user out
    this.cookie.delete('accessToken');
  }

}
