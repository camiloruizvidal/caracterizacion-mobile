import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoadComponent } from './component/form-load/form-load.component';

const routes: Routes = [{
  path: 'loadForm',
  component: FormLoadComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosRoutingModule { }
