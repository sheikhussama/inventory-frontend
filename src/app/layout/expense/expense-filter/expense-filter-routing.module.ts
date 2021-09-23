import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseDetailFilterComponent } from './expense-detail-filter/expense-detail-filter.component';
import { ExpenseFilterComponent } from './expense-filter.component';

const routes: Routes = [
    {
        path: '', component: ExpenseFilterComponent, children: [
          // {path: '', component: PaymentFilterComponent},
          {path: 'expenseDetail', component: ExpenseDetailFilterComponent},
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExpenseFilterRoutingModule {}
