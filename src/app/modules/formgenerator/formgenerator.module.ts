import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SteperComponent } from './components/steper/steper.component';
import { IonicModule } from '@ionic/angular';
import { AddressComponent } from './components/inputs/address/address.component';
import { CalendarComponent } from './components/inputs/calendar/calendar.component';
import { CheckComponent } from './components/inputs/check/check.component';
import { EmailComponent } from './components/inputs/email/email.component';
import { FilterComponent } from './components/inputs/filter/filter.component';
import { NumbersComponent } from './components/inputs/numbers/numbers.component';
import { PhoneComponent } from './components/inputs/phone/phone.component';
import { RelationshipComponent } from './components/inputs/relationship/relationship.component';
import { SelectComponent } from './components/inputs/select/select.component';
import { SelectFilterComponent } from './components/inputs/select-filter/select-filter.component';
import { TextComponent } from './components/inputs/text/text.component';
import { TextAreaComponent } from './components/inputs/text-area/text-area.component';
import { PhotoComponent } from './components/inputs/photo/photo.component';
import { GPSComponent } from './components/inputs/gps/gps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectMultipleComponent } from './components/inputs/select-multiple/select-multiple.component';
import { TitleComponent } from './components/inputs/title/title.component';
import { SubtitleComponent } from './components/inputs/subtitle/subtitle.component';
import { RutaAtencionComponent } from './components/inputs/ruta-atencion/ruta-atencion.component';
import { SelectDependienteComponent } from './components/inputs/select-dependiente/select-dependiente.component';

@NgModule({
  declarations: [
    SteperComponent,
    AddressComponent,
    CalendarComponent,
    CheckComponent,
    EmailComponent,
    FilterComponent,
    NumbersComponent,
    PhoneComponent,
    RelationshipComponent,
    SelectComponent,
    SelectMultipleComponent,
    SelectFilterComponent,
    TextComponent,
    TextAreaComponent,
    PhotoComponent,
    GPSComponent,
    TitleComponent,
    SubtitleComponent,
    RutaAtencionComponent,
    SelectDependienteComponent
  ],
  exports: [
    SteperComponent,
    AddressComponent,
    CalendarComponent,
    CheckComponent,
    EmailComponent,
    FilterComponent,
    NumbersComponent,
    PhoneComponent,
    RelationshipComponent,
    SelectComponent,
    SelectMultipleComponent,
    SelectFilterComponent,
    TextComponent,
    TextAreaComponent,
    PhotoComponent,
    GPSComponent,
    TitleComponent,
    SubtitleComponent,
    RutaAtencionComponent,
    SelectDependienteComponent
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule]
})
export class FormgeneratorModule {}
