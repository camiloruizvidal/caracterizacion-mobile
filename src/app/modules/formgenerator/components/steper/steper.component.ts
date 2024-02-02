import { ValidationsService } from './../../services/validations/validations.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ESteperType,
  IFamilyCard,
  IFamilyCardSave,
  ISteperValues,
  IStepers
} from '../../interfaces/interface';
import { RegistrosService } from 'src/app/modules/registros/services/registros.service';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.scss']
})
export class SteperComponent {
  @Input() dataSteper!: IStepers[];
  @Output() saveDataMethod = new EventEmitter<any>();
  public currentStep: number = 0;

  private saveData: IStepers[] = [];

  constructor(
    private validationsService: ValidationsService,
    private registrosService: RegistrosService
  ) {}

  public saveValueColumn(value: IStepers[]): void {
    this.saveData = value;
    console.log({ saveData: this.saveData });
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

  public isVisibilityInput(itemInputs: ISteperValues, card: IStepers): boolean {
    return this.validationsService.isVisibility(itemInputs, card);
  }

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
