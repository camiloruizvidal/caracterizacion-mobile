import { Injectable } from '@angular/core';
import {
  IOptionsRule,
  IOptionsVisibility,
  IPregunta,
  ICategoria,
  EConditions
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
            const fechaSeleccionada = moment(valueForm?.value);
            const fechaActual = moment();
            const edadEnMeses = fechaActual.diff(
              fechaSeleccionada,
              'months',
              true
            );

            isVisilty = rule.value.some(rangeString => {
              try {
                const rangeConfig = JSON.parse(rangeString);

                if (rangeConfig.type === 'relative') {
                  let mesInicio = rangeConfig.months || 0;
                  let mesFin =
                    rangeConfig.endMonths || rangeConfig.endYears * 12 || 0;
                  return edadEnMeses >= mesInicio && edadEnMeses <= mesFin;
                }
                return false;
              } catch (error) {
                return false;
              }
            });
          }
          break;
      }
    });

    return isVisilty;
  }

  private searchValueFromColumn(columnName: string, card: ICategoria) {
    return card?.values?.find(
      (value: IPregunta) => value.columnName === columnName
    );
  }
}
