import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DatabaseService } from 'src/app/utils/services/database/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loading: any;
  public loginForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private databaseService: DatabaseService,
    private router: Router
  ) {
    const username = '123456';
    const password = '123456';
    const server = 'https://api.crvtest.online';
    this.loginForm = this.formBuilder.group({
      username: [username, Validators.required],
      password: [password, Validators.required],
      server: [server, Validators.required]
    });
    this.startLoading();
  }

  public async ngOnInit(): Promise<void> {
    if (await this.loginService.isLogin()) {
      this.router.navigate(['/registros'], { replaceUrl: true });
    } else {
      this.loginService.closeLogin();
    }
  }

  private async startLoading(): Promise<void> {
    this.databaseService.setTable('server');
    const url = await this.databaseService.findOne();
    this.loginForm.get('server')?.setValue(url);
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando, por favor espere',
      spinner: 'circles'
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.databaseService.setTable('server');
      this.databaseService.createOrUpdate(
        this.loginForm.value['server'],
        'server'
      );

      this.loading.present();
      this.loginService
        .loginUser(
          this.loginForm.value['username'],
          this.loginForm.value['password'],
          this.loginForm.value['server']
        )
        .subscribe(
          response => {
            this.router.navigate(['/load'], { replaceUrl: true });
          },
          async (error: HttpErrorResponse) => {
            const toast = await this.toastController.create({
              message: error.error.message,
              duration: 2000,
              position: 'top'
            });
            toast.present();
          }
        );
    }
    this.loading.dismiss();
  }
}
