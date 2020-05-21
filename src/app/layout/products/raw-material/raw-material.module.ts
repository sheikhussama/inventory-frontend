import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListingRawMaterialsComponent } from './listing-raw-materials/listing-raw-materials.component';
import { CreateRawMaterialsComponent } from './create-raw-materials/create-raw-materials.component';
import { MaterialsComponent } from './raw-material.component';
import { MaterialsRoutingModule } from './raw-material-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { PageHeaderModule } from '../../../shared/modules/page-header/page-header.module';

@NgModule({
    imports: [CommonModule,SharedModule, 
    MaterialsRoutingModule, PageHeaderModule],
    declarations: [
        ListingRawMaterialsComponent, 
        CreateRawMaterialsComponent,
        MaterialsComponent
    ]
})
export class MaterialsModule {}
