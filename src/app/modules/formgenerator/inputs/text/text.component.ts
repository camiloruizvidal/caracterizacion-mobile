import { Component, Input, OnInit } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';
import { ValidationsService } from '../../services/validations.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {

  @Input() steperValue!: ISteperValues;

  constructor() { }

  ngOnInit() {
    const a = 1;
  }

  public get isRequired() : boolean {
    return ValidationsService.isRequired(this.steperValue.required);
  }

}
