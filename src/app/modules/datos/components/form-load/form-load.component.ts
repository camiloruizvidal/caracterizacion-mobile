import {
  IFamilyCard,
  IHttpResponse,
  IPaciente,
  IPaginationResult
} from './../../../formgenerator/interfaces/interface';
import { Component } from '@angular/core';
import { DatosService } from '../../service/datos/datos.service';
import {
  AlertController,
  LoadingController,
  ToastController
} from '@ionic/angular';
import { concatMap, range } from 'rxjs';

@Component({
  selector: 'app-form-load',
  templateUrl: './form-load.component.html',
  styleUrls: ['./form-load.component.scss']
})
export class FormLoadComponent {
  private loading: any;

  public isAlertOpen: boolean = false;
  public alertButtons = ['Aceptar'];
  public isLoadPatients = false;
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

  public async cargarFormulario(): Promise<void> {
    this.datosService.loadDataPatients(1, 100).subscribe(
      async (response: any) => {
        this.infoRegistros.currentPage = response.currentPage;
        this.infoRegistros.totalItems = response.totalItems;
        this.infoRegistros.totalPages = response.totalPages;
        const alert = await this.alertController.create({
          header:
            'Se van a agregar ' +
            this.infoRegistros.totalItems.toLocaleString('es-CO') +
            ' registros',
          message:
            'Este proceso puede demorar dependiendo su conexión de ' +
            'internet y la cantidad de registros. ¿Desea continuar?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {}
            },
            {
              text: 'Sí',
              handler: async () => {
                this.isLoadPatients = true;
                this.actualizarFormulario();
                await this.actualizarRegistrosPacientes();
              }
            }
          ]
        });

        await alert.present();
      },
      async (error: any) => {
        await this.showToastError();
      }
    );
  }

  private async actualizarRegistrosPacientes() {
    await this.datosService.borrarPacientes();
    range(1, this.infoRegistros.totalPages)
      .pipe(
        concatMap((pageNumber: number) => {
          if (this.infoRegistros.totalItems === pageNumber) {
            this.showToastSuccess();
          }
          try {
            return this.datosService.loadDataPatients(pageNumber, 100);
          } catch (error) {
            this.showToastError();
            throw error;
          }
        })
      )
      .subscribe(
        (pacientes: IPaginationResult<IPaciente[]>) => {
          this.pacientesActualizados += pacientes.data.length;
          this.datosService.addPatients(pacientes.data);
        },
        async (error: any) => {
          this.showToastError();
        }
      );
  }

  private actualizarFormulario() {
    this.datosService
      .loadDataForm()
      .subscribe((respuesta: IHttpResponse<IFamilyCard>) => {
        this.datosService.saveDataForm(respuesta.data);
      });
  }

  private async showToastError() {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 30000,
      position: 'bottom',
      message: 'Se presento un error cuando se intentaba actualizar.'
    });
    await toast.present();
    this.isLoadPatients = false;
  }

  private async showToastSuccess() {
    const toast = await this.toastController.create({
      color: 'success',
      duration: 30000,
      position: 'top',
      message: 'Se ha guardado con éxito.'
    });
    await toast.present();
  }

  public setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
