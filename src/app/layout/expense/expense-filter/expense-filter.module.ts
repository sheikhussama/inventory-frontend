import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared/modules/page-header/page-header.module';
import { SharedModule } from '../../../shared/shared.module';
import { ExpenseDetailFilterComponent } from './expense-detail-filter/expense-detail-filter.component';
import { ExpenseFilterRoutingModule } from './expense-filter-routing.module';
import { ExpenseFilterComponent } from './expense-filter.component';


@NgModule({
    imports: [CommonModule, SharedModule, ExpenseFilterRoutingModule, PageHeaderModule],
    declarations: [ExpenseDetailFilterComponent,ExpenseFilterComponent]
})
export class ExpenseFilterModule {}
