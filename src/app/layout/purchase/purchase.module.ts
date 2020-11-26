import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';
import { PurchaseComponent } from './purchase.component';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { CreatePurchaseComponent } from './create-purchase/create-purchase.component';
import { ListingPurchaseComponent } from './listing-purchase/listing-purchase.component';
import { SharedModule } from '../../shared/shared.module';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';

@NgModule({
    imports: [CommonModule, PurchaseRoutingModule,SharedModule, PageHeaderModule,PDFExportModule],
    declarations: [ PurchaseComponent, CreatePurchaseComponent, ListingPurchaseComponent]
})
export class PurchaseModule {}
