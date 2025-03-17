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
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IonicStorageModule } from '@ionic/storage-angular';
import { PatientsPersistenceService } from './service/patients-persistence/patients-persistence.service';
import { StorageService } from './service/storage/storage.service';

@NgModule({
  declarations: [FormLoadComponent, PersonsLoadComponent],
  exports: [FormLoadComponent, PersonsLoadComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    DatosRoutingModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [
    DatosService,
    DatabaseService,
    PatientsPersistenceService,
    StorageService
  ]
})
export class DatosModule {}
