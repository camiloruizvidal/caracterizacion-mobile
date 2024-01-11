import { Component, Input } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent extends BaseInputComponent {

  constructor() {
    super();
  }

}
