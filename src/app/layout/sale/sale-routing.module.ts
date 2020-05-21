import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleComponent } from './sale.component';
import { ListingSaleComponent } from './listing-sale/listing-sale.component';
import { CreateSaleComponent } from './create-sale/create-sale.component';

const routes: Routes = [
  {
    path: '', component: SaleComponent,
    children: [
      { path: '', component: ListingSaleComponent },
      { path: 'create', component: CreateSaleComponent },
      { path: 'update/:id', component: CreateSaleComponent },
      { path: 'salefilter', loadChildren: () => import('./sale-filter/sale-filter.module').then((m) => m.SaleFilterModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
