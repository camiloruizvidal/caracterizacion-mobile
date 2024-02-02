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
  @Input() hasManyRegister: Boolean = false;
  @Output() saveDataMethod = new EventEmitter<IStepers[]>();
  public currentStep: number = 0;
  public isDisabled: boolean = false;

  private saveData: IStepers[] = [];

  constructor(
    private validationsService: ValidationsService,
    private registrosService: RegistrosService
  ) {}

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
    this.isDisabled = true;
    this.saveDataMethod.emit(this.saveData);
  }

  public nuevoRegistro(): void {
    this.saveDataMethod.emit(this.saveData);
    //this.currentStep = 0;
    //this.saveData = this.dataSteper;
  }

  public isVisibilityInput(itemInputs: ISteperValues, card: IStepers): boolean {
    return this.validationsService.isVisibility(itemInputs, card);
  }

  public get SteperType(): typeof ESteperType {
    return ESteperType;
  }

  public get isNextDisabled(): boolean {
    let requireds = this.dataSteper[this.currentStep].values.filter(
      value =>
        value.required && (value.value == null || value.value.trim() === '')
    );
    return (
      this.currentStep >= this.dataSteper.length - 1 || requireds.length > 0
    );
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
