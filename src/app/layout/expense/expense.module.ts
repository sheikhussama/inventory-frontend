import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../shared';
import { ExpenseComponent } from './expense.component';
import { SharedModule } from '../../shared/shared.module';
import { ExpenseRoutingModule } from './expense-routing.module';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { ListingExpenseComponent } from './listing-expense/listing-expense.component';


@NgModule({
    imports: [CommonModule, SharedModule, ExpenseRoutingModule, PageHeaderModule],
    declarations: [ExpenseComponent, CreateExpenseComponent, ListingExpenseComponent]
})
export class ExpenseModule {}
