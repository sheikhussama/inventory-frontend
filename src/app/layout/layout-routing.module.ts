import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { path: 'products', loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule) },
            { path: 'client', loadChildren: () => import('./client/client.module').then((m) => m.ClientModule) },
            {
                path: 'payment',
                loadChildren: () => import('./payment/payment.module').then((m) => m.PaymentModule)
            },
            { path: 'expense', loadChildren: () => import('./expense/expense.module').then((m) => m.ExpenseModule) },
            {
                path: 'purchase',
                loadChildren: () => import('./purchase/purchase.module').then((m) => m.PurchaseModule)
            },
            {
                path: 'sale',
                loadChildren: () => import('./sale/sale.module').then((m) => m.SaleModule)
            }
            ,
            {
                path: 'processing',
                loadChildren: () => import('./processing/processing.module').then((m) => m.ProcessingModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
