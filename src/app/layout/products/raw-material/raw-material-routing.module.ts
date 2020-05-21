import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialsComponent } from './raw-material.component';
import { CreateRawMaterialsComponent } from './create-raw-materials/create-raw-materials.component';
import { ListingRawMaterialsComponent } from './listing-raw-materials/listing-raw-materials.component';


const routes: Routes = [
    {
        path: '', component: MaterialsComponent, children: [
          {path: '', component: ListingRawMaterialsComponent},
          {path: 'create', component: CreateRawMaterialsComponent},
          {path: 'update/:id', component: CreateRawMaterialsComponent},

        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaterialsRoutingModule {}
