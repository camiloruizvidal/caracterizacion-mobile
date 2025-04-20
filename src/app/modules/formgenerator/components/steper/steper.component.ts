import { ValidationsService } from './../../services/validations/validations.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges
} from '@angular/core';
import {
  ETipoPregunta,
  IEventSteper,
  IEventSteperStatus,
  IPregunta,
  ICategoria
} from '../../interfaces/interface';
import { RegistrosService } from 'src/app/modules/registros/services/registros.service';
import { Constantes } from 'src/app/core/constantes';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.scss']
})
export class SteperComponent implements OnInit, OnChanges {
  @Input() dataSteper!: ICategoria[];
  @Input() hasManyRegister: Boolean = false;
  @Input() isUpdate: Boolean = false;
  @Output() saveDataMethod = new EventEmitter<IEventSteper>();
  public currentStep: number = 0;
  public isDisabled: boolean = false;
  public machetazo: number = 0;
  public saveData: ICategoria[] = [];
  public esTest = Constantes.esTest;

  constructor(
    private validationsService: ValidationsService,
    private registrosService: RegistrosService
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.isUpdate) {
      this.clearValues(this.dataSteper);
    }
    this.validationsService.setFormValue(this.dataSteper);
  }

  ngOnChanges(changes: any): void {
    if (changes.dataSteper && changes.dataSteper.currentValue) {
      this.validationsService.setFormValue(changes.dataSteper.currentValue);
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
    Promise.resolve().then(() => {
      this.machetazo = this.machetazo + 1;
      setTimeout(() => {
        this.machetazo = this.machetazo + 1;
      }, 300);
    });
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
    if (this.esTest) {
      return false;
    }
    //let requireds =
    //this.dataSteper[this.currentStep]?.values?.filter(
    //  value =>
    //    value.required && (value.value == null || value.value.trim() === '')
    //) || [];
    let requireds =
      this.dataSteper[this.currentStep]?.values?.filter(value => {
        if (!this.isVisibilityInput(value, this.dataSteper[this.currentStep])) {
          return false;
        }

        if (!value.required) {
          return false;
        }

        if (value.value == null) {
          return true;
        }

        let isValid = false;
        switch (value.type) {
          case ETipoPregunta.Check:
          case ETipoPregunta.CheckSiNo:
            isValid = value.value === false || value.value === null;
            break;
          case ETipoPregunta.Numbers:
            isValid = value.value === 0 || value.value === null;
            break;
          case ETipoPregunta.Select:
          case ETipoPregunta.SelectFilter:
          case ETipoPregunta.SelectDependiente:
          case ETipoPregunta.SelectMultiple:
            isValid = Array.isArray(value.value)
              ? value.value.length === 0
              : !value.value;
            break;
          default:
            isValid = value.value.toString().trim() === '';
        }

        return isValid;
      }) || [];

    return requireds.length > 0;
  }

  public get isLastDisabled(): boolean {
    return this.currentStep === 0;
  }

  public get isShowSave(): boolean {
    return this.currentStep === this.dataSteper.length - 1;
  }

  public capturarPlanes(planes: string[]): void {}
}
