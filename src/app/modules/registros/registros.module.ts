import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrosRoutingModule } from './registros-routing.module';
import { TemplatesModule } from '../templates/templates.module';
import { IonicModule } from '@ionic/angular';
import { ListarComponent } from './components/listar/listar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  declarations: [ListarComponent, RegistrarComponent, IndexComponent],
  imports: [IonicModule, CommonModule, TemplatesModule, RegistrosRoutingModule]
})
export class RegistrosModule {}
