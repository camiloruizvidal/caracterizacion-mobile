import { Component } from '@angular/core';
import { DatosService } from '../../service/datos/datos.service';
import {
  AlertController,
  LoadingController,
  ToastController
} from '@ionic/angular';

@Component({
  selector: 'app-form-load',
  templateUrl: './form-load.component.html',
  styleUrls: ['./form-load.component.scss']
})
export class FormLoadComponent {
  private loading: any;

  public isAlertOpen: boolean = false;
  public alertButtons = ['Aceptar'];

  public modalAbierto: boolean = false;
  public pacientesActualizados = 0;
  public infoRegistros: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
  } = {
    currentPage: 0,
    totalItems: 0,
    totalPages: 0
  };

  constructor(
    private datosService: DatosService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
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

  //public cargarFormulario(): void {
  //  this.startLoading();
  //  this.datosService.loadDataForm().subscribe(
  //    (response: IHttpResponse<IFamilyCard>) => {
  //      this.datosService.saveDataForm(response.data);
  //      this.setOpen(true);
  //      this.stopLoading();
  //    },
  //    async error => {
  //      const toast = await this.toastController.create({
  //        color: 'dark',
  //        duration: 5000,
  //        position: 'bottom',
  //        message: 'Se presento un error cuando se intentaba actualizar.'
  //      });
  //      await toast.present();
  //    }
  //  );

  //  this.datosService.loadDataAllPatients().subscribe(
  //    (pacientes: IPaciente[]) => {
  //      this.datosService.saveDataPatient(pacientes);
  //    },
  //    async error => {
  //      const toast = await this.toastController.create({
  //        color: 'dark',
  //        duration: 5000,
  //        position: 'bottom',
  //        message: 'Se presento un error cuando se intentaba actualizar.'
  //      });
  //      await toast.present();
  //    }
  //  );
  //}

  public async cargarFormulario(): Promise<void> {
    this.datosService
      .loadDataPatients(1, 100)
      .subscribe(async (response: any) => {
        this.infoRegistros.currentPage = response.currentPage;
        this.infoRegistros.totalItems = response.totalItems;
        this.infoRegistros.totalPages = response.totalPages;
        console.log({ infoRegistros: this.infoRegistros });
        const alert = await this.alertController.create({
          header:
            'Se van a agregar ' +
            this.infoRegistros.totalItems.toLocaleString('es-CO') +
            ' registros',
          message: '¿Desea continuar?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                console.log('Usuario ha seleccionado No');
              }
            },
            {
              text: 'Sí',
              handler: () => {
                this.actualizarRegistrosPacientes();
              }
            }
          ]
        });

        await alert.present();
      });
  }

  private actualizarRegistrosPacientes() {}

  public setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
