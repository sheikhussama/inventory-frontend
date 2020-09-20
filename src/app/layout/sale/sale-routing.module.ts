import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleComponent } from './sale.component';
import { ListingSaleComponent } from './listing-sale/listing-sale.component';
import { OilComponent } from './oil/oil.component';
import { SaltSeedComponent } from './salt-seed/salt-seed.component';
import { OthersComponent } from './others/others.component';

const routes: Routes = [
  {
    path: '', component: SaleComponent,
    children: [
      { path: '', component: ListingSaleComponent },
      { path: 'create-oil', component: OilComponent },
      { path: 'create-salt-seed', component: SaltSeedComponent },
      { path: 'create-others', component: OthersComponent },
      { path: 'update/oil/:id', component: OilComponent },
      { path: 'update/salt-seed/:id', component: SaltSeedComponent },
      { path: 'update/others/:id', component: OthersComponent },
      { path: 'salefilter', loadChildren: () => import('./sale-filter/sale-filter.module').then((m) => m.SaleFilterModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
