import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';
import { IPregunta, ICategoria } from '../../../interfaces/interface';

@Component({
  selector: 'app-base-input',
  template: ''
})
export class BaseInputComponent {
  constructor() {
    setTimeout(() => {
      this.start();
    }, 300);
  }

  @Input() steperValue!: IPregunta;
  @Input() formValue!: ICategoria[];

  @Output() saveInputData = new EventEmitter<ICategoria[]>();
  @Output() isValidated = new EventEmitter<boolean>();

  public valueData: any = '';
  public isValid: boolean = true;

  public start(): void {
    const detail = { value: this.steperValue.value };
    this.saveInput({ detail });
  }

  public saveInput(value: any): void {
    this.valueData = value.detail.value;

    for (const step of this.formValue) {
      const matchingValue = step.values.find(
        (steperValue: IPregunta) =>
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
    if (this.steperValue.required) {
      if (typeof this.steperValue.required === 'boolean') {
        validate = this.steperValue.required;
      } else if (this.steperValue.required.isDepend) {
        //TODO se requiere hacer una mayor evaluacion
        validate = this.steperValue.required?.required || true;
      } else {
        validate = this.steperValue.required?.required || false;
      }
    }

    this.isValid = validate && this.valueData !== '' && this.valueData !== null;
    this.isValidated.emit(this.isValid);

    return validate;
  }
}
