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
      value: {
        detail: event.detail.value.join('. ')
      }
    });
  }
}
