import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleFilterComponent } from './sale-filter.component';
import { SaleHistoryComponent } from './sale-history/sale-history.component';

const routes: Routes = [
    {
        path: '', component: SaleFilterComponent, 
          children: [
          {path: 'saleHistory', component: SaleHistoryComponent},
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaleFilterRoutingModule {}
