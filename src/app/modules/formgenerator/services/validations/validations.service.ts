import { Injectable } from '@angular/core';
import {
  IOptionsRule,
  IOptionsVisibility,
  IPregunta,
  ICategoria,
  EConditions,
  ETipoPregunta
} from '../../interfaces/interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  private _formValue: ICategoria[] = [];

  constructor() {}

  public setFormValue(formValue: ICategoria[]) {
    this._formValue = formValue;
  }

  public get formValue(): ICategoria[] {
    return this._formValue;
  }

  public isVisibility(itemInputs: IPregunta, card: ICategoria): boolean {
    let isVisibility: boolean = true;

    if (typeof itemInputs.visibility === 'boolean') {
      return itemInputs.visibility;
    } else if (itemInputs.visibility && itemInputs.visibility?.rules) {
      isVisibility = this.isValidatedRules(itemInputs.visibility, card);
    }

    return isVisibility;
  }

  private isValidatedRules(
    visibility: IOptionsVisibility,
    card: ICategoria
  ): boolean {
    let isVisilty = true;
    visibility?.rules?.forEach((rule: IOptionsRule) => {
      const valueForm = this.searchValueFromColumn(rule.columnDepend, card);

      switch (rule.rule) {
        case EConditions.IGUAL_QUE:
          isVisilty = valueForm?.value === rule.value;
          break;
        case EConditions.OR:
          if (Array.isArray(rule.value)) {
            if (valueForm?.type === ETipoPregunta.Calendar) {
              isVisilty = this.validateDateRanges(valueForm.value, rule.value);
            } else {
              isVisilty = rule.value.includes(valueForm?.value);
            }
          }
          break;
      }
    });

    return isVisilty;
  }

  private searchValueFromColumn(columnName: string, card: ICategoria) {
    // Primero buscar en todos los cards del formulario
    for (const formCard of this._formValue || []) {
      if (formCard?.values) {
        for (const value of formCard.values) {
          if (value.columnName === columnName) {
            return value;
          }
        }
      }
    }

    // Si no se encuentra en formValue, buscar en el card actual
    if (card?.values) {
      for (const value of card.values) {
        if (value.columnName === columnName) {
          return value;
        }
      }
    }

    return null;
  }

  private validateDateRanges(selectedDate: string, ranges: string[]): boolean {
    if (!selectedDate) {
      return false;
    }

    const fechaSeleccionada = moment(selectedDate).startOf('day');
    const fechaActual = moment().startOf('day');

    return ranges.some(rangeString => {
      try {
        const rangeConfig = JSON.parse(rangeString);

        if (rangeConfig.type === 'relative') {
          if (rangeConfig.endYears) {
            const edadEnAnios = fechaActual.diff(
              fechaSeleccionada,
              'years',
              false
            );
            return (
              edadEnAnios >= rangeConfig.years &&
              edadEnAnios <= rangeConfig.endYears
            );
          } else if (rangeConfig.endMonths) {
            const edadEnMeses = fechaActual.diff(
              fechaSeleccionada,
              'months',
              false
            );
            return (
              edadEnMeses >= rangeConfig.months &&
              edadEnMeses <= rangeConfig.endMonths
            );
          } else if (rangeConfig.years) {
            const edadEnAnios = fechaActual.diff(
              fechaSeleccionada,
              'years',
              false
            );

            switch (rangeConfig.condition) {
              case EConditions.MENOR_QUE:
                return edadEnAnios < rangeConfig.years;
              case EConditions.MENOR_O_IGUAL_QUE:
                return edadEnAnios <= rangeConfig.years;
              case EConditions.MAYOR_QUE:
                return edadEnAnios > rangeConfig.years;
              case EConditions.MAYOR_O_IGUAL_QUE:
                return edadEnAnios >= rangeConfig.years;
              case EConditions.IGUAL_QUE:
                return edadEnAnios === rangeConfig.years;
              default:
                return edadEnAnios === rangeConfig.years;
            }
          } else if (rangeConfig.months) {
            const edadEnMeses = fechaActual.diff(
              fechaSeleccionada,
              'months',
              false
            );

            switch (rangeConfig.condition) {
              case EConditions.MENOR_QUE:
                return edadEnMeses < rangeConfig.months;
              case EConditions.MENOR_O_IGUAL_QUE:
                return edadEnMeses <= rangeConfig.months;
              case EConditions.MAYOR_QUE:
                return edadEnMeses > rangeConfig.months;
              case EConditions.MAYOR_O_IGUAL_QUE:
                return edadEnMeses >= rangeConfig.months;
              case EConditions.IGUAL_QUE:
                return edadEnMeses === rangeConfig.months;
              default:
                return edadEnMeses === rangeConfig.months;
            }
          }
        }
        return false;
      } catch (error) {
        return false;
      }
    });
  }
}
