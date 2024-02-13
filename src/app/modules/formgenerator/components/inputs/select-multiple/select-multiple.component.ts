import { Component } from '@angular/core';
import { IOptionsSelect } from '../../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.scss']
})
export class SelectMultipleComponent extends BaseInputComponent {
  constructor() {
    super();
  }
  private optionsSelect: string[] = [];

  public get options(): IOptionsSelect[] {
    return this.steperValue.options as IOptionsSelect[];
  }

  public handlerClic(event: any, index: number) {
    const options = this.options;
    const selectedOption = options[index];
    if (event.target.checked) {
      this.optionsSelect.push(selectedOption.value);
    } else {
      const indexToRemove = this.optionsSelect.indexOf(selectedOption.value);
      if (indexToRemove !== -1) {
        this.optionsSelect.splice(indexToRemove, 1);
      }
    }

    this.saveInput({
      detail: {
        value: this.optionsSelect.join('; ')
      }
    });
  }
}
