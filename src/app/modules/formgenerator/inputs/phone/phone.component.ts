import { Component, Input, OnInit } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent  implements OnInit {

  @Input() steperValue!: ISteperValues;

  constructor() { }

  ngOnInit() {
    console.log({steperValues: this.steperValue});
  }

}
