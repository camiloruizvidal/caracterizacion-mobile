import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './components/listar/listar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { IndexComponent } from './components/index/index.component';
import { SendComponent } from './components/send/send.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'listar',
    component: ListarComponent
  },
  {
    path: 'nuevo',
    component: RegistrarComponent
  },
  {
    path: 'nuevo/:id',
    component: RegistrarComponent
  },
  {
    path: 'actualizar/:id',
    component: ActualizarComponent
  },
  {
    path: 'actualizar/:id/idPaciente',
    component: ActualizarComponent
  },
  {
    path: 'enviar',
    component: SendComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrosRoutingModule {}
