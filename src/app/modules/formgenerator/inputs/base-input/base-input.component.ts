import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';

@Component({
  selector: 'app-base-input',
  template: '',
})
export class BaseInputComponent {

  constructor() {
    console.log({this: this})
  }

  @Input() steperValue!: ISteperValues;
  @Output() saveInputEvent = new EventEmitter<{ columnName: string, value: any }>();

  public saveInput(columnName: string, value: any): void {
    this.saveInputEvent.emit({ columnName, value });
  }

  public get isRequired() : boolean {
    let validation: boolean = false;
    if(this.steperValue.required.isDepend) {
      //TODO se requiere hacer una mayor evaluacion
      validation = this.steperValue.required.required;
    } else {
      validation = this.steperValue.required.required;
    }
    return validation;
  }

}
