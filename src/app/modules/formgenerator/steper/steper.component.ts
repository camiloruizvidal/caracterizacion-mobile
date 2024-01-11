import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ESteperType, IFamilyCard, IStepers, IValueColumn } from '../interfaces/interface';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.scss'],
})
export class SteperComponent implements OnInit {

  constructor() { }

  @Input() dataSteper!: IStepers[];
  public currentStep: number = 0;

  private saveData: IValueColumn[] = []


  public ngOnInit(): void {
    this.setDataDefault();
  }

  private setDataDefault(): void {

    this.dataSteper.forEach((staperItem) => {
      staperItem.values.forEach((field) => {

        this.saveData.push({
          columnName: field.columnName,
          value: field.default,
        });

      });
    });

  }

  public saveValueColumn(value: IValueColumn): void {

    const existingIndex = this.saveData.findIndex(item => item.columnName === value.columnName);

    if (existingIndex !== -1) {
      this.saveData[existingIndex] = value;
    } else {
      this.saveData.push(value);
    }

  }

  public goNext(): void {
    this.currentStep = this.currentStep + 1;
  }
  public goBack(): void {
    this.currentStep = this.currentStep - 1;
  }

  public get SteperType(): typeof ESteperType {
    return ESteperType;
  }

  public get isNextDisabled() : boolean {
    return this.currentStep >= this.dataSteper.length - 1;
  }

  public get isLastDisabled() : boolean {
    return this.currentStep < this.dataSteper.length - 1;
  }

  public get isShowSave() : boolean {
    return this.currentStep === this.dataSteper.length - 1;
  }

}
