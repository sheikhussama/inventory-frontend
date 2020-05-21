import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateSaleComponent } from './create-sale/create-sale.component';
import { ListingSaleComponent } from './listing-sale/listing-sale.component';
import { SaleComponent } from './sale.component';
import { SaleRoutingModule } from './sale-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { OilComponent } from './oil/oil.component';
import { SaltSeedComponent } from './salt-seed/salt-seed.component';
import { OthersComponent } from './others/others.component';

@NgModule({
    imports: [CommonModule, SharedModule, SaleRoutingModule , PageHeaderModule],
    declarations: [SaleComponent, CreateSaleComponent, ListingSaleComponent, ListingSaleComponent, OilComponent, SaltSeedComponent, OthersComponent]
})
export class SaleModule {}
