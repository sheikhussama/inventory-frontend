import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { CreateProductsComponent } from './create-products/create-products.component';
import { ListingProductsComponent } from './listing-products/listing-products.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [CommonModule,SharedModule, ProductsRoutingModule, PageHeaderModule],
    declarations: [
        ProductsComponent, 
        CreateProductsComponent, 
        ListingProductsComponent,
    ]
})
export class ProductsModule {}
