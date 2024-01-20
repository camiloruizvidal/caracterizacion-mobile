import { IonicStorageModule } from '@ionic/storage-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { PersonasService } from './services/personas/personas.service';
import { FichaService } from './services/ficha/ficha.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, CommonModule, IonicModule.forRoot(), IonicStorageModule.forRoot()],
  providers: [PersonasService, FichaService]
})
export class TarjetasModule { }
