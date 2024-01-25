import { CommonModule } from '@angular/common';
import { DatosRoutingModule } from './datos-routing.module';
import { DatosService } from './service/datos/datos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormLoadComponent } from './components/form-load/form-load.component';
import { PersonsLoadComponent } from './components/persons-load/persons-load.component';
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from 'src/app/utils/services/database/database.service';


@NgModule({
  declarations: [FormLoadComponent, PersonsLoadComponent],
  exports: [FormLoadComponent, PersonsLoadComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    DatosRoutingModule,
    HttpClientModule
  ],
  providers: [DatosService, DatabaseService],
})
export class DatosModule { }