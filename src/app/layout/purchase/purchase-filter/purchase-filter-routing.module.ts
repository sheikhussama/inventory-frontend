import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseFilterComponent } from './purchase-filter.component';
import { FinishGoodsFilterComponent } from './finish-goods-filter/finish-goods-filter.component';
import { RawPurchaseFilterComponent } from './raw-purchase-filter/raw-purchase-filter.component';

const routes: Routes = [
    {
        path: '', component: PurchaseFilterComponent, 
          children: [
          // {path: '', component: PurchaseFilterComponent},
          {path: 'finishGoodFilter', component: FinishGoodsFilterComponent},
          {path: 'rawPurchse', component: RawPurchaseFilterComponent},
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseFilterRoutingModule {}
