import { Component, Input, OnInit } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent extends BaseInputComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    console.log({steperValue: this.steperValue});
  }

}
