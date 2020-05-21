import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PageHeaderModule } from '../../../shared/modules/page-header/page-header.module';
import { ProcessingFilterComponent } from './processing-filter.component';
import { RecipeFilterComponent } from './recipe-filter/recipe-filter.component';
import { RawFilterComponent } from './raw-filter/raw-filter.component';
import { ProcessingFilterRoutingModule } from './processing-filter-routing.module';


@NgModule({
    imports: [CommonModule,SharedModule, ProcessingFilterRoutingModule, PageHeaderModule],
    declarations: [
        ProcessingFilterComponent,
        RecipeFilterComponent,
        RawFilterComponent 
   ]
})
export class ProcessingFilterModule {}
