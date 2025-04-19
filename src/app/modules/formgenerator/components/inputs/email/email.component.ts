import { Component, OnInit } from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent extends BaseInputComponent implements OnInit {
  public emailControl: FormControl;

  constructor() {
    super();
    this.emailControl = new FormControl('', [Validators.email]);
  }

  ngOnInit() {
    if (this.steperValue.value) {
      this.emailControl.setValue(this.steperValue.value);
    }
  }

  override saveInput(event: any): void {
    const emailValue = event.detail.value;
    this.emailControl.setValue(emailValue, { emitEvent: false });

    if (!emailValue || this.emailControl.valid) {
      super.saveInput(event);
    }
  }

  get emailError(): boolean {
    return (
      this.emailControl.invalid &&
      (this.emailControl.dirty || this.emailControl.touched)
    );
  }
}
