import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliverableProductComponent } from './deliverable-product.component';
import { ListingEndProductComponent } from './listing-end-product/listing-end-product.component';
import { EndProductComponent } from './end-product/end-product.component';

const routes: Routes = [
    {
        path: '', component: DeliverableProductComponent, children: [
          {path: '', component: ListingEndProductComponent},
          {path: 'create', component: EndProductComponent},
          {path: 'update/:id', component: EndProductComponent},
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliverableRoutingModule {}
