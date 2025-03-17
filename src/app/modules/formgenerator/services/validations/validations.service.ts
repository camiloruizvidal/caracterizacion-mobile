import { Injectable } from '@angular/core';
import {
  IOptionsRule,
  IOptionsVisibility,
  IPregunta,
  ICategoria
} from '../../interfaces/interface';

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
    visibility?.rules?.forEach((rule: any) => {
      const valueForm = this.searchValueFromColumn(rule.columnDepend, card);
      switch (rule.rule) {
        case '=':
          isVisilty = valueForm?.value === rule.value;
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
