import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule, LoginRoutingModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
