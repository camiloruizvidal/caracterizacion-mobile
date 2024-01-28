import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../service/datos/datos.service';
import {
  IFamilyCard,
  IHttpResponse
} from 'src/app/modules/formgenerator/interfaces/interface';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-form-load',
  templateUrl: './form-load.component.html',
  styleUrls: ['./form-load.component.scss']
})
export class FormLoadComponent {
  private loading: any;

  public isAlertOpen: boolean = false;
  public alertButtons = ['Aceptar'];

  constructor(
    private datosService: DatosService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {}

  private async startLoading(): Promise<void> {
    this.loading = null;
    this.loading = await this.loadingCtrl
      .create({
        message: 'Cargando, por favor espere',
        spinner: 'circles'
      })
      .then(loading => loading.present());
  }

  private stopLoading() {
    this.loading.dismiss();
  }

  public cargarFormulario(): void {
    //this.startLoading();
    this.datosService.loadDataForm().subscribe(
      (response: IHttpResponse<IFamilyCard>) => {
        this.datosService.saveDataForm(response.data);
        //this.stopLoading();
        this.setOpen(true);
      },
      async error => {
        const toast = await this.toastController.create({
          color: 'dark',
          position: 'bottom',
          message: 'Se presento un error cuando se intentaba actualizar.'
        });
        await toast.present();
        //await this.stopLoading();
      }
    );
  }

  public setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
