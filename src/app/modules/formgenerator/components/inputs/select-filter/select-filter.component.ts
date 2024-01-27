import { Component, Input } from '@angular/core';
import { ISteperValues } from '../../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss'],
})
export class SelectFilterComponent extends BaseInputComponent {

  constructor() {
    super();
  }

}
