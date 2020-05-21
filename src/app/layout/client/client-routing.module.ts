import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ListingClientComponent } from './listing-client/listing-client.component';
import { CreateClientComponent } from './create-client/create-client.component';

const routes: Routes = [
    {
        path: '', component: ClientComponent, 
          children: [
          {path: '', component: ListingClientComponent},
          {path: 'create', component: CreateClientComponent},
          {path: 'update/:id', component: CreateClientComponent},
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {}
