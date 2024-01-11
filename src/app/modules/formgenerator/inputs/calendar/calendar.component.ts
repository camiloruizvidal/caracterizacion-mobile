import { Component, Input } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent extends BaseInputComponent {

  constructor() {
    super();
  }

}
