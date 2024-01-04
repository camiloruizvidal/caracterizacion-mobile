import { Component, Input, OnInit } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent  implements OnInit {

  @Input() steperValue!: ISteperValues;

  constructor() { }

  ngOnInit() {
    console.log({steperValues: this.steperValue});
  }

}
