import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../../shared/modules/page-header/page-header.module';
import { SharedModule } from '../../../shared/shared.module';
import { PaymentFilterRoutingModule } from './payment-filter-routing.module';
import { PaymentFilterComponent } from './payment-filter.component';
import { PaymentDetailFilterComponent } from './payment-detail-filter/payment-detail-filter.component';


@NgModule({
    imports: [CommonModule, SharedModule, PaymentFilterRoutingModule, PageHeaderModule, NgbModule],
    declarations: [PaymentFilterComponent,PaymentDetailFilterComponent]
})
export class PaymentFilterModule {}
