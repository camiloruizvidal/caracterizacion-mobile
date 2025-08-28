import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LoadingController,
  ToastController,
  AlertController,
  ModalController
} from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { Constantes } from 'src/app/core/constantes';
import { ServerConfigModalComponent } from '../server-config-modal/server-config-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loading: any;
  public loginForm: FormGroup;
  public esTest = Constantes.esTest;
  public siInicioSesion = false;

  constructor(
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private databaseService: DatabaseService,
    private alertController: AlertController,
    private modalController: ModalController,
    private router: Router
  ) {
    const username = Constantes.esTest ? '123456' : '';
    const password = Constantes.esTest ? '123456' : '';
    this.loginForm = this.formBuilder.group({
      username: [username, Validators.required],
      password: [password, Validators.required]
    });
    this.startLoading();
  }

  public async ngOnInit(): Promise<void> {
    this.siInicioSesion = await this.loginService.siInicioSesion();
    if (await this.loginService.isLogin()) {
      this.router.navigate(['/registros'], { replaceUrl: true });
    } else {
      this.loginService.closeLogin();
    }
  }

  private async startLoading(): Promise<void> {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando, por favor espere',
      spinner: 'circles'
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      // Obtener servidor configurado
      this.databaseService.setTable('server');
      const serverUrl = await this.databaseService.findOne();
      
      if (!serverUrl) {
        const toast = await this.toastController.create({
          message: 'Debe configurar un servidor antes de iniciar sesión',
          duration: 3000,
          position: 'top',
          color: 'warning'
        });
        toast.present();
        return;
      }

      this.loading.present();
      this.loginService
        .loginUser(
          this.loginForm.value['username'],
          this.loginForm.value['password'],
          serverUrl
        )
        .subscribe(
          response => {
            localStorage.setItem('isActive', 'true');
            this.router.navigate(['/load'], { replaceUrl: true });
          },
          async (error: HttpErrorResponse) => {
            if ([0, 504].includes(error.status) && !this.siInicioSesion) {
              const alert = await this.alertController.create({
                header: 'Error de conexión',
                subHeader: 'Primer inicio de sesión',
                message:
                  'Para iniciar sesión por primera vez necesita tener conexión a internet. Por favor verifique su conexión e intente nuevamente.',
                buttons: ['Entendido']
              });
              await alert.present();
            } else {
              const toast = await this.toastController.create({
                message:
                  error.error?.message ||
                  'Error de conexión. Verifique su conexión a internet.',
                duration: 2000,
                position: 'top'
              });
              toast.present();
            }
          }
        );

      this.loading.dismiss();
    }
  }

  async openServerConfig() {
    try {
      console.log('🔧 Abriendo configuración de servidor...');
      
      const modal = await this.modalController.create({
        component: ServerConfigModalComponent,
        backdropDismiss: false
      });
      
      console.log('✅ Modal creado, presentando...');
      await modal.present();
      console.log('✅ Modal presentado');
      
    } catch (error) {
      console.error('❌ Error al abrir modal:', error);
      
      const alert = await this.alertController.create({
        header: 'Error',
        message: `No se pudo abrir el modal: ${error}`,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
