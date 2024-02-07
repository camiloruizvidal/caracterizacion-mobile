import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loading: any;
  public loginForm: FormGroup;

  constructor(
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['admin', Validators.required],
      password: ['admin', Validators.required],
      server: ['http://localhost:3000', Validators.required]
    });
    this.startLoading();
  }

  public ngOnInit(): void {
    this.loginService.closeLogin();
  }

  private async startLoading(): Promise<void> {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando, por favor espere',
      spinner: 'circles'
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.present();
      this.loginService
        .loginUser(
          this.loginForm.value['username'],
          this.loginForm.value['password'],
          this.loginForm.value['server']
        )
        .subscribe(response => {
          this.router.navigate(['/load'], { replaceUrl: true });
        });
    }
    this.loading.dismiss();
  }
}
