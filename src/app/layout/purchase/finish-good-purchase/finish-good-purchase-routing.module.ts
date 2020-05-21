import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishGoodPurchaseComponent } from './finish-good-purchase.component';
import { ListingFinishComponent } from './listing-finish/listing-finish.component';
import { CreateListingFinishComponent } from './create-listing-finish/create-listing-finish.component';

const routes: Routes = [
    {
        path: '', component: FinishGoodPurchaseComponent, 
          children: [
          {path: '', component: ListingFinishComponent},
          {path: 'create', component: CreateListingFinishComponent},
          {path: 'update/:id', component: CreateListingFinishComponent},
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinishGoodsRoutingModule {}
