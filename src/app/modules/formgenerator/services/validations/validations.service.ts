import { Injectable } from '@angular/core';
import {
  IOptionsRule,
  IOptionsVisibility,
  ISteperValues,
  IStepers
} from '../../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  constructor() {}

  public isVisibility(itemInputs: ISteperValues, card: IStepers): boolean {
    let isVisibility: boolean = true;
    if(typeof itemInputs.visibility === 'boolean') {
      return itemInputs.visibility;
    }
    else if (itemInputs.visibility && itemInputs.visibility?.rules) {
      isVisibility = this.isValidatedRules(itemInputs.visibility, card);
    }
    return isVisibility;
  }

  private isValidatedRules(
    visibility: IOptionsVisibility,
    card: IStepers
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

  private searchValueFromColumn(columnName: string, card: IStepers) {
    return card.values.find(
      (values: ISteperValues) => values.columnName === columnName
    );
  }
}
