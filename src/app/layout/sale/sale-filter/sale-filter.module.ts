import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module'; 
import { PageHeaderModule } from '../../.././shared/modules/page-header/page-header.module'; 
import { SaleFilterComponent } from './sale-filter.component';
import { SaleHistoryComponent } from './sale-history/sale-history.component';
import { SaleFilterRoutingModule } from './sale-history-routing.module';
import { SalePendingOrdersComponent } from './sale-pending-orders/sale-pending-orders.component';


@NgModule({
    imports: [CommonModule, SharedModule, SaleFilterRoutingModule, PageHeaderModule],
    declarations: [SaleFilterComponent, SaleHistoryComponent, SalePendingOrdersComponent]
})
export class SaleFilterModule { }
