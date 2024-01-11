import { IonicStorageModule } from '@ionic/storage-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { PersonasService } from './services/personas/personas.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, IonicModule.forRoot(), IonicStorageModule.forRoot(),],
  providers: [PersonasService]
})
export class TarjetasModule { }
