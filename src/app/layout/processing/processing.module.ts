import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';

import { SharedModule } from '../../shared/shared.module';
import { ProcessingRoutingModule } from './processing-routing.module';
import { ProcessingComponent } from './processing.component';
import { ListingProcessingComponent } from './listing-processing/listing-processing.component';
import { DetailProcessingComponent } from './detail-processing/detail-processing.component';
import { ProcessingFilterComponent } from './processing-filter/processing-filter.component';

@NgModule({
    imports: [CommonModule,SharedModule, ProcessingRoutingModule, PageHeaderModule],
    declarations: [
        ProcessingComponent,
        ListingProcessingComponent,
        DetailProcessingComponent   
   ]
})
export class ProcessingModule {}
