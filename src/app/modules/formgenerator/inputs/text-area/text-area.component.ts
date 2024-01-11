import { Component, Input, OnInit } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';
import { ValidationsService } from '../../services/validations.service';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends BaseInputComponent {

  constructor() {
    super();
  }

}
