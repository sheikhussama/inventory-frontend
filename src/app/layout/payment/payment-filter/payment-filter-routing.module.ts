import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentFilterComponent } from './payment-filter.component';
import { PaymentDetailFilterComponent } from './payment-detail-filter/payment-detail-filter.component';
import { CustomerLedgerComponent } from './customer-ledger/customer-ledger.component';

const routes: Routes = [
    {
        path: '', component: PaymentFilterComponent, children: [
          // {path: '', component: PaymentFilterComponent},
          {path: 'paymentDetail', component: PaymentDetailFilterComponent},
          {path: 'customer-ledger', component: CustomerLedgerComponent}

        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentFilterRoutingModule {}
