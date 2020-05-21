import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';
import { PurchaseComponent } from './purchase.component';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { CreatePurchaseComponent } from './create-purchase/create-purchase.component';
import { ListingPurchaseComponent } from './listing-purchase/listing-purchase.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [CommonModule, PurchaseRoutingModule,SharedModule, PageHeaderModule],
    declarations: [ PurchaseComponent, CreatePurchaseComponent, ListingPurchaseComponent]
})
export class PurchaseModule {}
