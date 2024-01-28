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
        (steperValue: ISteperValues) =>
          steperValue.columnName === this.steperValue.columnName
      );
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
    if (this.hasVisibilityDependency()) {
      if (this.groupMatchesRules(this.steperValue.visibility?.rules || [])) {
        return this.steperValue.visibility?.isShow || false;
      }
      return !this.steperValue.visibility?.isShow;
    }
    return this.steperValue.visibility?.isShow || true;
  }

  private hasVisibilityDependency(): boolean {
    return (
      this.steperValue.visibility?.isDepent !== undefined &&
      this.steperValue.visibility?.rules !== undefined
    );
  }

  private groupMatchesRules(ruleGroup: any[]): boolean {
    return ruleGroup?.every(rule => {
      const dependentValue = this.getDependentValue(rule.columnDepend);
      return this.evaluateRule(dependentValue, rule.rule, rule.value);
    });
  }

  private getDependentValue(columnName: string): any {
    const dependentStep = this.formValue.find(step =>
      step.values.some(val => val.columnName === columnName)
    );
    //console.log({columnName,dependentStep, steperValue: this.steperValue})
    const dependentValue = dependentStep?.values.find(
      val => {
        //console.log(val)
        return val.columnName === columnName;
      }
    )?.value;

    // Si hay reglas de visibilidad en el valor dependiente, puedes ajustar el código aquí.
    // Puedes evaluar las reglas de visibilidad si existen y afectan al valor dependiente.

    return dependentValue;
  }

  private evaluateRule(value: any, rule: string, expectedValue: any): boolean {
    switch (rule) {
      case '=':
        return value === expectedValue;
      // Puedes agregar más casos según las reglas que necesites manejar
      default:
        return false;
    }
  }
}
