import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared/modules/page-header/page-header.module';
import { SharedModule } from '../../../shared/shared.module';
import { PaymentFilterRoutingModule } from './payment-filter-routing.module';
import { PaymentFilterComponent } from './payment-filter.component';
import { PaymentDetailFilterComponent } from './payment-detail-filter/payment-detail-filter.component';
import { CustomerLedgerComponent } from './customer-ledger/customer-ledger.component';


@NgModule({
    imports: [CommonModule, SharedModule, PaymentFilterRoutingModule, PageHeaderModule],
    declarations: [PaymentFilterComponent,PaymentDetailFilterComponent, CustomerLedgerComponent]
})
export class PaymentFilterModule {}
