import { Component } from '@angular/core';
import { IOptionsSelect } from '../../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseInputComponent {
  constructor() {
    super();
  }

  public get options(): IOptionsSelect[] {
    return this.steperValue.options as IOptionsSelect[];
  }
}
