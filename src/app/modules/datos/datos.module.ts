import { CommonModule } from '@angular/common';
import { DatosRoutingModule } from './datos-routing.module';
import { DatosService } from './service/datos/datos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormLoadComponent } from './component/form-load/form-load.component';
import { PersonsLoadComponent } from './component/persons-load/persons-load.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [FormLoadComponent, PersonsLoadComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    DatosRoutingModule,
    HttpClientModule
  ],
  providers: [DatosService],
})
export class DatosModule { }
