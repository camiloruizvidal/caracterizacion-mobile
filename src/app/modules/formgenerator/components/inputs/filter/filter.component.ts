import { Component, Input } from '@angular/core';
import { ISteperValues } from '../../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent extends BaseInputComponent {

  constructor() {
    super();
  }

}
