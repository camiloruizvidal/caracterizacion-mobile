import {
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
        this.infoRegistros.currentPage = response?.currentPage || 0;
        this.infoRegistros.totalItems = response?.totalItems || 0;
        this.infoRegistros.totalPages = response?.totalPages || 0;
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
    range(1, this.infoRegistros.totalPages || 1)
      .pipe(
        concatMap((pageNumber: number) => {
          if (this.infoRegistros.totalPages <= pageNumber) {
            setTimeout(() => {
              this.stopLoading();
            }, 3000);
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
          this.pacientesActualizados += (pacientes.data as any[])?.length || 0;
          this.datosService.addPatients(pacientes.data);
        },
        async (error: any) => {
          this.showToastError();
        }
      );
  }

  private async actualizarFormulario() {
    this.datosService
      .loadDataForm()
      .subscribe((respuesta: IHttpResponse<any>) => {
        console.log({ data: respuesta.data });
        this.datosService.saveDataForm(respuesta.data);
      });
  }

  private async showToastError() {
    const toast = await this.toastController.create({
      message: 'Error al cargar los datos',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  private async showToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Datos cargados con éxito',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  public setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
