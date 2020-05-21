import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessingFilterComponent } from './processing-filter.component';
import { RawFilterComponent } from './raw-filter/raw-filter.component';
import { RecipeFilterComponent } from './recipe-filter/recipe-filter.component';

const routes: Routes = [
    {
        path: '', component: ProcessingFilterComponent, children: [
          {path: 'finishGood', component: RawFilterComponent},
          {path: 'rawProduct', component: RecipeFilterComponent},
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcessingFilterRoutingModule {}
