import { Component, Input, OnInit } from '@angular/core';
import { IOptionsCheck, ISteperValues } from '../../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
})
export class CheckComponent extends BaseInputComponent implements OnInit {

  constructor() {
    super();
  }

  public value: any;

  private valueOption: IOptionsCheck | null = null;

  ngOnInit() {
    this.value = this.steperValue.value;
    this.valueOption = this.steperValue.options;

    if(this.value === undefined) {
      this.value = this.valueOption?.valueFalse;
    }

  }

  hadnleChange(): void {
    this.value = this.value === this.valueOption?.valueTrue
                ? this.valueOption?.valueFalse
                : this.valueOption?.valueTrue;
  }

}
