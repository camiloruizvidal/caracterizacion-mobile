import { Component, Input, OnInit } from '@angular/core';
import { ESteperType, IFamilyCard, IStepers } from '../interfaces/interface';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.scss'],
})
export class SteperComponent {

  @Input() dataSteper!: IStepers[];

  public currentStep: number = 0;

  constructor() { }

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
