import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessingComponent } from './processing.component';
import { ListingProcessingComponent } from './listing-processing/listing-processing.component';
import { DetailProcessingComponent } from './detail-processing/detail-processing.component';

const routes: Routes = [
    {
        path: '', component: ProcessingComponent, children: [
          {path: '', component: ListingProcessingComponent},
          {path: 'detail/:id', component: DetailProcessingComponent},
          {path: 'update/:id', component: DetailProcessingComponent},
          { path: 'processingFilter', loadChildren: () => import('./processing-filter/processing-filter.module').then((m) => m.ProcessingFilterModule) },
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcessingRoutingModule {}
