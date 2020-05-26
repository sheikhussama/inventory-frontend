import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UserRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { ListingUsersComponent } from './listing-users/listing-users.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { DeleteUsersComponent } from './delete-users/delete-users.component';

@NgModule({
    imports: [CommonModule,SharedModule, PageHeaderModule, UserRoutingModule],
    declarations: [UsersComponent , ListingUsersComponent, CreateUsersComponent, ActiveUsersComponent, DeleteUsersComponent]
})
export class UsersModule {}
