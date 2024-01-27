import { Component, Input } from '@angular/core';
import { ISteperValues } from '../../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss'],
})
export class RelationshipComponent extends BaseInputComponent {

  constructor() {
    super();
  }

}
