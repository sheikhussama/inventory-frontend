import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared/modules/page-header/page-header.module';
import { SharedModule } from '../../../shared/shared.module';
import { FinishGoodsRoutingModule } from './finish-good-purchase-routing.module';
import { FinishGoodPurchaseComponent } from './finish-good-purchase.component';
import { ListingFinishComponent } from './listing-finish/listing-finish.component';
import { CreateListingFinishComponent } from './create-listing-finish/create-listing-finish.component';

@NgModule({
    imports: [CommonModule, FinishGoodsRoutingModule,SharedModule, PageHeaderModule],
    declarations: [ FinishGoodPurchaseComponent, ListingFinishComponent, CreateListingFinishComponent, FinishGoodPurchaseComponent]
})
export class FinishGoodsModule {}
