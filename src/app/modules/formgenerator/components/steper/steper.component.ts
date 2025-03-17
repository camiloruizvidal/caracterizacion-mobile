import { ValidationsService } from './../../services/validations/validations.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ETipoPregunta,
  IEventSteper,
  IEventSteperStatus,
  IPregunta,
  ICategoria
} from '../../interfaces/interface';
import { RegistrosService } from 'src/app/modules/registros/services/registros.service';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.scss']
})
export class SteperComponent implements OnInit {
  @Input() dataSteper!: ICategoria[];
  @Input() hasManyRegister: Boolean = false;
  @Input() isUpdate: Boolean = false;
  @Output() saveDataMethod = new EventEmitter<IEventSteper>();
  public currentStep: number = 0;
  public isDisabled: boolean = false;
  public saveData: ICategoria[] = [];

  constructor(
    private validationsService: ValidationsService,
    private registrosService: RegistrosService
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.isUpdate) {
      this.clearValues(this.dataSteper);
    }
  }

  private clearValues(datasSteper: ICategoria[]) {
    if (!datasSteper) return;

    datasSteper.forEach((dataSteper: ICategoria, keyDataSteper: number) => {
      const values = datasSteper[keyDataSteper]?.values;
      if (values) {
        values.forEach((_, keyValues: number) => {
          if (values[keyValues]) {
            values[keyValues].value = null;
          }
        });
      }
    });
    this.dataSteper = datasSteper;
  }

  public saveValueColumn(categoriaActualizada: ICategoria[]): void {
    this.saveData = categoriaActualizada;
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

  public isVisibilityInput(itemInputs: IPregunta, card: ICategoria): boolean {
    return this.validationsService.isVisibility(itemInputs, card);
  }

  public get SteperType(): typeof ETipoPregunta {
    return ETipoPregunta;
  }

  public get isNextDisabled(): boolean {
    return false; //TODO Solo para probar. Eliminar antes de entregar
    let requireds =
      this.dataSteper[this.currentStep]?.values?.filter(
        value =>
          value.required && (value.value == null || value.value.trim() === '')
      ) || [];
    return requireds.length > 0;
  }

  public get isLastDisabled(): boolean {
    return this.currentStep === 0;
  }

  public get isShowSave(): boolean {
    return this.currentStep === this.dataSteper.length - 1;
  }
}
