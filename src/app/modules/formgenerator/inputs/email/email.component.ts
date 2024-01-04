import { Component, Input, OnInit } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent  implements OnInit {

  @Input() steperValue!: ISteperValues;

  constructor() { }

  ngOnInit() {
    console.log({steperValues: this.steperValue});
  }

}
