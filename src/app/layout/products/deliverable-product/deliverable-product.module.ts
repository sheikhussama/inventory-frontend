import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeliverableProductComponent } from './deliverable-product.component';
import { SharedModule } from '../../../shared/shared.module';
import { PageHeaderModule } from '../../../shared/modules/page-header/page-header.module';
import { ListingEndProductComponent } from './listing-end-product/listing-end-product.component';
import { EndProductComponent } from './end-product/end-product.component';
import { DeliverableRoutingModule } from './deliverable-product-routing.module';

@NgModule({
    imports: [CommonModule,SharedModule, DeliverableRoutingModule, PageHeaderModule],
    declarations: [
        DeliverableProductComponent, 
        ListingEndProductComponent, 
        EndProductComponent,
    ]
})
export class DeliverableModule {}
