import { Component, Input } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent extends BaseInputComponent {

  constructor() {
    super();
  }

}
