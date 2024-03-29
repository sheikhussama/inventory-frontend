import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { ListingUsersComponent } from './listing-users/listing-users.component';
import { ActiveUsersComponent } from './active-users/active-users.component';

const routes: Routes = [
    {
        path: '', component: UsersComponent, 
          children: [
          {path: '', component: ListingUsersComponent},
          {path: 'create', component: CreateUsersComponent},
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
