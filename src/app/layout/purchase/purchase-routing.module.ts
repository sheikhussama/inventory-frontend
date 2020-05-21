import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase.component';
import { ListingPurchaseComponent } from './listing-purchase/listing-purchase.component';
import { CreatePurchaseComponent } from './create-purchase/create-purchase.component';

const routes: Routes = [
    {
        path: '', component: PurchaseComponent, 
          children: [
          {path: '', component: ListingPurchaseComponent},
          {path: 'create', component: CreatePurchaseComponent},
          {path: 'update/:id', component: CreatePurchaseComponent},
          { path: 'finishGoods', loadChildren: () => import('./finish-good-purchase/finish-good-purchase.module').then((m) => m.FinishGoodsModule) },
          { path: 'purchaseFilter', loadChildren: () => import('./purchase-filter/purchase-filter.module').then((m) => m.PurchaseModule) },
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseRoutingModule {}
