import { Component, Input, OnInit } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';
import { ValidationsService } from '../../services/validations.service';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent  implements OnInit {

  @Input() steperValue!: ISteperValues;

  constructor() { }

  ngOnInit() {
    console.log({steperValues: this.steperValue});
  }

  public get isRequired() : boolean {
    return ValidationsService.isRequired(this.steperValue.required);
  }

}
