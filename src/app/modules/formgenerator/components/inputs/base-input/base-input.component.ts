import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { ISteperValues, IStepers } from '../../../interfaces/interface';

@Component({
  selector: 'app-base-input',
  template: ''
})
export class BaseInputComponent {
  constructor() {}

  @Input() steperValue!: ISteperValues;
  @Input() formValue!: IStepers[];

  @Output() saveInputData = new EventEmitter<IStepers[]>();
  @Output() isValidated = new EventEmitter<boolean>();

  public valueData: any = '';
  public isValid: boolean = true;

  public saveInput(value: any): void {
    this.valueData = value.detail.value;

    for (const step of this.formValue) {
      const matchingValue = step.values.find(
        (st: ISteperValues) => st.columnName === this.steperValue.columnName
      );
      console.log({ formValue: this.formValue });
      if (matchingValue) {
        matchingValue.value = this.valueData;
        this.saveInputData.emit(this.formValue);
        break;
      }
    }
  }

  public get isRequired(): boolean {
    let validate: boolean = false;
    return false;
    if (this.steperValue.required?.isDepend) {
      //TODO se requiere hacer una mayor evaluacion
      validate = this.steperValue.required?.required || true;
    } else {
      validate = this.steperValue.required?.required || false;
    }

    this.isValid = validate && this.valueData !== '' && this.valueData !== null;
    this.isValidated.emit(this.isValid);

    return validate;
  }

  public get isVisibility(): boolean {
    for (const item of this.formValue) {
      const visibilityRules = this.steperValue.visibility;
      const validation =
        visibilityRules?.isDepent &&
        visibilityRules?.rules &&
        visibilityRules?.rules.every((ruleGroup: any) =>
          ruleGroup.every((rule: any) => {
            debugger;
            const { columnDepend, rule: comparisonRule, value } = rule;
            const columnValue = item.values.find((value: any) => {
              debugger;
              return value.columnName === columnDepend;
            })?.value;

            switch (comparisonRule) {
              case '=':
                return columnValue === value;
              // Agrega más casos según sea necesario (pueden ser '>', '<', etc.)
              default:
                return false;
            }
          })
        );
      if (validation) {
        return true;
      }
    }
    return true;
  }
}
