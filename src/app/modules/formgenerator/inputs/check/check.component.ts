import { Component, Input, OnInit } from '@angular/core';
import { IOptionsCheck, ISteperValues } from '../../interfaces/interface';
import { ValidationsService } from '../../services/validations.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
})
export class CheckComponent  implements OnInit {

  @Input() steperValue!: ISteperValues;

  public value: any;

  private valueOption: IOptionsCheck | null = null;

  constructor() {
  }

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

  public get isRequired() : boolean {
    return ValidationsService.isRequired(this.steperValue.required);
  }

}
