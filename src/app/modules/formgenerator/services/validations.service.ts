import { Injectable } from '@angular/core';
import { IOptionsRequired } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  public static isRequired(required: IOptionsRequired): boolean {
    let validation: boolean = false;
    if(required.isDepend) {
      validation = required.required;
    } else {
      validation = required.required;
    }
    return validation;
  }
}
