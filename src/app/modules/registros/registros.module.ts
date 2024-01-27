import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrosRoutingModule } from './registros-routing.module';
import { TemplatesModule } from '../templates/templates.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegistrosRoutingModule,
    TemplatesModule
  ]
})
export class RegistrosModule { }
