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
  constructor() {}

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

  private validateDateRanges(selectedDate: string, ranges: string[]): boolean {
    const fechaSeleccionada = moment(selectedDate).startOf('day');
    const fechaActual = moment().startOf('day');

    return ranges.some(rangeString => {
      try {
        const rangeConfig = JSON.parse(rangeString);

        if (rangeConfig.type === 'relative') {
          if (rangeConfig.endMonths) {
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
            return edadEnAnios === rangeConfig.years;
          } else if (rangeConfig.months) {
            const edadEnMeses = fechaActual.diff(
              fechaSeleccionada,
              'months',
              false
            );
            return edadEnMeses === rangeConfig.months;
          }
        }
        return false;
      } catch {
        return false;
      }
    });
  }

  private searchValueFromColumn(columnName: string, card: ICategoria) {
    return card?.values?.find(
      (value: IPregunta) => value.columnName === columnName
    );
  }
}
