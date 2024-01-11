import { Component, Input, OnInit } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent extends BaseInputComponent {

  constructor() {
    super();
  }

}
