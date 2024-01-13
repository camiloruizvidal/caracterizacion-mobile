import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { ISteperValues, IStepers, IValueColumn } from '../../interfaces/interface';

@Component({
  selector: 'app-base-input',
  template: '',
})
export class BaseInputComponent {

  constructor() {
  }

  @Input() steperValue!: ISteperValues;
  @Input() formValue!: IStepers[];

  @Output() saveInputData = new EventEmitter<IValueColumn>();
  @Output() isValidated = new EventEmitter<boolean>();

  public valueData: any = '';
  public isValid: boolean = true;

  public saveInput(value: any): void {

    this.valueData = value.detail.value;

    this.saveInputData.emit({
      columnName: this.steperValue.columnName,
      value: this.valueData,
      isValid: this.isValid
    });

  }

  public get isRequired() : boolean {
    let validate: boolean = false;
    if(this.steperValue.required.isDepend) {console.log({formValue:this.formValue})
      //TODO se requiere hacer una mayor evaluacion
      validate = this.steperValue.required.required;
    } else {
      validate = this.steperValue.required.required;
    }

    this.isValid = validate && (this.valueData !== '' && this.valueData !== null);
    debugger
    this.isValidated.emit(this.isValid);

    return validate;

  }

}
