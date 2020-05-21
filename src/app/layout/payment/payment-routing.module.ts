import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { CreatePaymentComponent } from './create-payment/create-payment.component';

const routes: Routes = [
    {
        path: '', component: PaymentComponent, children: [
          {path: '', component: ListPaymentComponent},
          {path: 'create', component: CreatePaymentComponent},
          {path: 'update/:id', component: CreatePaymentComponent},
          { path: 'paymentFilter', loadChildren: () => import('./payment-filter/payment-filter.module').then((m) => m.PaymentFilterModule) },

        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentRoutingModule {}
