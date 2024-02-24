import { ValidationsService } from './../../services/validations/validations.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ESteperType,
  IEventSteper,
  IEventSteperStatus,
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
  @Input() isUpdate: Boolean = false;
  @Output() saveDataMethod = new EventEmitter<IEventSteper>();
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
    this.saveDataMethod.emit({
      data: this.saveData,
      status: IEventSteperStatus.salir
    });
  }

  public nuevoRegistro(): void {
    this.saveDataMethod.emit({
      data: this.saveData,
      status: IEventSteperStatus.nuevo
    });
  }

  public isVisibilityInput(itemInputs: ISteperValues, card: IStepers): boolean {
    return this.validationsService.isVisibility(itemInputs, card);
  }

  public get SteperType(): typeof ESteperType {
    return ESteperType;
  }

  public get isNextDisabled(): boolean {
    return false;
    let requireds = this.dataSteper[this.currentStep].values.filter(
      value =>
        value.required && (value.value == null || value.value.trim() === '')
    );
    return (
      this.currentStep >= this.dataSteper.length - 1 || requireds.length > 0
    );
  }

  public get isLastDisabled(): boolean {
    return this.currentStep === 0;
  }

  public get isShowSave(): boolean {
    return this.currentStep === this.dataSteper.length - 1;
  }
}
