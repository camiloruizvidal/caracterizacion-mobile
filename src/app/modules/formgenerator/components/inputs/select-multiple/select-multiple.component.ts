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

  public get options(): IOptionsSelect[] {
    return this.steperValue.options as IOptionsSelect[];
  }

  public handlerClic(event: any) {
    this.saveInput({
      detail: {
        value: event.detail.value.join('; ')
      }
    });
  }

  public get getValueArray(): string[] {
    return null === this.steperValue.value
      ? []
      : this.steperValue.value.split('; ');
  }
}
