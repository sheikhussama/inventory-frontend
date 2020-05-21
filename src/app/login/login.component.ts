import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt from 'jwt-decode';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.services';
import { CookieService } from 'ngx-cookie-service';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    token: any;

    constructor(
        private fb: FormBuilder,
        public authService: AuthService,
        private cookie: CookieService,
        private router: Router,
        private toast: ToasterService) {}

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.loginForm = this.fb.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(6)]],
        });
      }

      onSubmit() {
        const loginFormData = this.loginForm.value;
        this.authService.login(loginFormData).subscribe((response: any) => {
            this.router.navigate(['/dashboard']);
            this.toast.pop('success', 'Success!', 'Login SuccessFully.');
            if (response && response.token) {
            this.cookie.set('accessToken', response.token);
            const profileDetail = jwt(response.token);
            localStorage.setItem('profileDetail', JSON.stringify(profileDetail));

          }
        });

      }
   
      
      get username() {
        return this.loginForm.get('username');
      }
      get password() {
        return this.loginForm.get('password');
      }




}
