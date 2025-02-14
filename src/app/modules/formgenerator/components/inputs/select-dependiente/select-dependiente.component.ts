import { Component } from '@angular/core';
import {
  IOptionsSelect,
  IOptionsSelectDependient
} from '../../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-select-dependiente',
  templateUrl: './select-dependiente.component.html',
  styleUrls: ['./select-dependiente.component.scss']
})
export class SelectDependienteComponent extends BaseInputComponent {
  constructor() {
    super();
  }

  public get options(): IOptionsSelect[] {
    let option = '';

    for (const values of this.formValue) {
      const options = values.values.find(
        value => value.columnName === this.steperValue.nombrePadreDependiente
      );
      if (options) {
        option = options.value;
        break;
      }
    }

    const optionsSeletct = this.steperValue
      .options as IOptionsSelectDependient[];
    return optionsSeletct.filter(
      options => options.valueDependiente === option
    );
  }
}
