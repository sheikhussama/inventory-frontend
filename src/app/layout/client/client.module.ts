import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';
import { ClientComponent } from './client.component';
import { ListingClientComponent } from './listing-client/listing-client.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { SharedModule } from '../../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
    imports: [CommonModule, SharedModule, ClientRoutingModule, PageHeaderModule],
    declarations: [ClientComponent, ListingClientComponent, CreateClientComponent]
})
export class ClientModule {}
