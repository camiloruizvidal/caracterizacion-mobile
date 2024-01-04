import { Component, Input, OnInit } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent  implements OnInit {

  @Input() steperValue!: ISteperValues;

  constructor() { }

  ngOnInit() {
    console.log({steperValues: this.steperValue});
  }

}
