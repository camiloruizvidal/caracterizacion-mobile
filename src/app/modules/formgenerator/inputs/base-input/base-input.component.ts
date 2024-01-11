import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';
import { ValidationsService } from '../../services/validations.service';

@Component({
  selector: 'app-base-input',
  template: '',
})
export class BaseInputComponent {

  @Input() steperValue!: ISteperValues;
  @Output() saveInputEvent = new EventEmitter<{ columnName: string, value: any }>();

  public saveInput(columnName: string, value: any): void {
    this.saveInputEvent.emit({ columnName, value });
  }

  public get isRequired() : boolean {
    return ValidationsService.isRequired(this.steperValue.required);
  }

}
