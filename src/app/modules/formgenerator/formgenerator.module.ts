import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SteperComponent } from './steper/steper.component';
import { IonicModule } from '@ionic/angular';
import { AddressComponent } from './inputs/address/address.component';
import { CalendarComponent } from './inputs/calendar/calendar.component';
import { CheckComponent } from './inputs/check/check.component';
import { EmailComponent } from './inputs/email/email.component';
import { FilterComponent } from './inputs/filter/filter.component';
import { NumbersComponent } from './inputs/numbers/numbers.component';
import { PhoneComponent } from './inputs/phone/phone.component';
import { RelationshipComponent } from './inputs/relationship/relationship.component';
import { SelectComponent } from './inputs/select/select.component';
import { SelectFilterComponent } from './inputs/select-filter/select-filter.component';
import { TextComponent } from './inputs/text/text.component';
import { TextAreaComponent } from './inputs/text-area/text-area.component';
import { PhotoComponent } from './inputs/photo/photo.component';

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
    SelectFilterComponent,
    TextComponent,
    TextAreaComponent,
    PhotoComponent,
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
    SelectFilterComponent,
    TextComponent,
    TextAreaComponent,
    PhotoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class FormgeneratorModule { }
