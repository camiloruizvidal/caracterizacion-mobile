import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SteperComponent } from './steper/steper.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SteperComponent],
  exports: [SteperComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class FormgeneratorModule { }
