import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { FormgeneratorModule } from '../formgenerator/formgenerator.module';
import { TarjetasModule } from '../tarjetas/tarjetas.module';
import { PersonasService } from '../tarjetas/services/personas/personas.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    FormgeneratorModule,
    TarjetasModule
  ],
  declarations: [Tab1Page],
  providers: [
    PersonasService
  ]
})
export class Tab1PageModule { }
