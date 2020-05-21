import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentFilterComponent } from './payment-filter.component';
import { PaymentDetailFilterComponent } from './payment-detail-filter/payment-detail-filter.component';

const routes: Routes = [
    {
        path: '', component: PaymentFilterComponent, children: [
          // {path: '', component: PaymentFilterComponent},
          {path: 'paymentDetail', component: PaymentDetailFilterComponent}

        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentFilterRoutingModule {}
