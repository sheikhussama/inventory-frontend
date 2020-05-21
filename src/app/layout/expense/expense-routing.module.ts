import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './expense.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { ListingExpenseComponent } from './listing-expense/listing-expense.component';

const routes: Routes = [
    {
        path: '', component: ExpenseComponent, children: [
          {path: '', component: ListingExpenseComponent},
          {path: 'create', component: CreateExpenseComponent},
          {path: 'update/:id', component: CreateExpenseComponent}
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExpenseRoutingModule {}
