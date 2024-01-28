import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ESteperType, IFamilyCard, IStepers } from '../../interfaces/interface';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.scss']
})
export class SteperComponent {
  constructor() {}

  @Input() dataSteper!: IStepers[];
  @Output() saveDataMethod = new EventEmitter<any>();

  public currentStep: number = 0;

  private saveData: IStepers[] = [];

  public saveValueColumn(value: IStepers[]): void {
    this.saveData = value;
  }

  public goNext(): void {
    this.currentStep = this.currentStep + 1;
  }

  public goBack(): void {
    this.currentStep = this.currentStep - 1;
  }

  public guardar(): void {
    this.saveDataMethod.emit(this.saveData);
  }

  //public isValidStep() {
  //  const values = this.dataSteper[this.currentStep].values;

  //  values.forEach(field => {
  //    const savedField = this.saveData.find(
  //      item => item.columnName === field.columnName
  //    );

  //    if (savedField) {
  //      const savedValue = savedField.value;
  //    }
  //  });
  //}

  public get SteperType(): typeof ESteperType {
    return ESteperType;
  }

  public get isNextDisabled(): boolean {
    //this.isValidStep();
    return this.currentStep >= this.dataSteper.length - 1;
  }

  public get isLastDisabled(): boolean {
    return (
      this.currentStep === 0 || this.currentStep < this.dataSteper.length - 1
    );
  }

  public get isShowSave(): boolean {
    return this.currentStep === this.dataSteper.length - 1;
  }
}
