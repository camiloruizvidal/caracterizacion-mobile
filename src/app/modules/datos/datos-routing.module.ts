import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoadComponent } from './components/form-load/form-load.component';
import { PersonsLoadComponent } from './components/persons-load/persons-load.component';

const routes: Routes = [
  {
    path: 'load',
    children: [
      {
        path: 'patient',
        component: PersonsLoadComponent
      },
      {
        path: 'form',
        component: FormLoadComponent
      }]
  },
  {
    path: '',
    redirectTo: '/load/form',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosRoutingModule { }
