import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { ISteperValues, IValueColumn } from '../../interfaces/interface';

@Component({
  selector: 'app-base-input',
  template: '',
})
export class BaseInputComponent {

  constructor() {
    console.log({this: this})
  }

  @Input() steperValue!: ISteperValues;
  @Output() saveInputData = new EventEmitter<IValueColumn>();

  public valueData: any = '';

  public saveInput(value: any): void {

    this.valueData = value.detail.value;

    this.saveInputData.emit({
      columnName: this.steperValue.columnName,
      value: this.valueData
    });

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
