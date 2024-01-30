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

  private saveData!: IFamilyCardSave;

  constructor(
    private validationsService: ValidationsService,
    private registrosService: RegistrosService
  ) {
    this.registrosService.loadForms().then((response: IFamilyCard) => {
      this.inicialiceForm(response);
    });
  }

  private inicialiceForm(response: IFamilyCard): void {
    for (let i = 0; i < this.dataSteper.length; i++) {
      //console.log(this.dataSteper[i]);
    }
    this.saveData = {
      dateLastVersion: new Date(response.dateLastVersion),
      version: response.version,
      data: []
    };
  }
  public saveValueColumn(value: IStepers[]): void {
    //console.log({ value });
    //this.saveData = value;
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

  public isVisibilityInput(
    itemInputs: ISteperValues,
    card: IStepers
  ): boolean {
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
