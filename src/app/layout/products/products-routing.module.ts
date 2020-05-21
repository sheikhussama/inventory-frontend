import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { ListingProductsComponent } from './listing-products/listing-products.component';

const routes: Routes = [
    {
        path: '', component: ProductsComponent, children: [
          {path: '', component: ListingProductsComponent},
          {path: 'create', component: CreateProductsComponent},
          {path: 'update/:id', component: CreateProductsComponent},
          { path: 'raw', loadChildren: () => import('./raw-material/raw-material.module').then((m) => m.MaterialsModule) },
          { path: 'endProduct', loadChildren: () => import('./deliverable-product/deliverable-product.module').then((m) => m.DeliverableModule) },

        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {}
