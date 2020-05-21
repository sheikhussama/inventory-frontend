import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../shared';
import { SharedModule } from '../../shared/shared.module';
import { PaymentComponent } from './payment.component';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { ListPaymentComponent } from './list-payment/list-payment.component';


@NgModule({
    imports: [CommonModule, SharedModule, PaymentRoutingModule, PageHeaderModule, NgbModule],
    declarations: [PaymentComponent, CreatePaymentComponent, ListPaymentComponent]
})
export class PaymentModule {}
