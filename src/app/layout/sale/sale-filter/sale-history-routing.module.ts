import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleFilterComponent } from './sale-filter.component';
import { SaleHistoryComponent } from './sale-history/sale-history.component';
import { SalePendingOrdersComponent } from './sale-pending-orders/sale-pending-orders.component';
import { SaleDeliverableOrdersComponent } from './sale-deliverable-orders/sale-deliverable-orders.component';

const routes: Routes = [
    {
        path: '', component: SaleFilterComponent, 
          children: [
          {path: 'saleHistory', component: SaleHistoryComponent},
          {path: 'pending-order', component: SalePendingOrdersComponent},
          {path: 'delivered-order', component: SaleDeliverableOrdersComponent},
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaleFilterRoutingModule {}
