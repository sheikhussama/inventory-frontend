import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared/modules/page-header/page-header.module';
import { SharedModule } from '../../../shared/shared.module';
import { PurchaseFilterRoutingModule } from './purchase-filter-routing.module';
import { PurchaseFilterComponent } from './purchase-filter.component';
import { FinishGoodsFilterComponent } from './finish-goods-filter/finish-goods-filter.component';
import { RawPurchaseFilterComponent } from './raw-purchase-filter/raw-purchase-filter.component';

@NgModule({
    imports: [CommonModule, PurchaseFilterRoutingModule,SharedModule, PageHeaderModule],
    declarations: [PurchaseFilterComponent , RawPurchaseFilterComponent, FinishGoodsFilterComponent]
})
export class PurchaseModule {}
