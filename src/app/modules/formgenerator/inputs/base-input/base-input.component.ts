import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';

@Component({
  selector: 'app-base-input',
  template: '',
})
export class BaseInputComponent {

  @Input() steperValue!: ISteperValues;
  @Output() saveInputEvent = new EventEmitter<{ columnName: string, value: any }>();

  constructor() {
    console.log('Lógica común del servicio base.');
  }

  saveInput(columnName: string, value: any): void {
    this.saveInputEvent.emit({ columnName, value });
  }

}
