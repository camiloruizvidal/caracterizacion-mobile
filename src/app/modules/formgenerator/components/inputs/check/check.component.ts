import { Component, Input, OnInit } from '@angular/core';
import { IOptionsCheck, ISteperValues } from '../../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent extends BaseInputComponent implements OnInit {
  constructor() {
    super();
  }

  public value: any;
  public valueCheck: boolean = false;

  private valueOption: IOptionsCheck | null = null;

  ngOnInit() {
    console.log(this.steperValue);
    this.value = this.steperValue.value;
    this.valueOption = this.steperValue.options;

    if (this.value === undefined) {
      this.value = this.valueOption?.valueFalse;
    }
    this.valueCheck = this.value == this.valueOption?.valueTrue;
  }

  hadnleChange(): void {
    this.value =
      this.value === this.valueOption?.valueTrue
        ? this.valueOption?.valueFalse
        : this.valueOption?.valueTrue;
    this.valueCheck = this.value == this.valueOption?.valueTrue;
  }
}
