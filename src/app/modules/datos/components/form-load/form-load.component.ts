import {
  IGrupalCard,
  IHttpResponse,
  IPaciente,
  IPaginationResult,
  IRespuestaRegistrosCarga
} from './../../../formgenerator/interfaces/interface';
import { Component } from '@angular/core';
import { DatosService } from '../../service/datos/datos.service';
import {
  AlertController,
  LoadingController,
  ToastController
} from '@ionic/angular';
import { concatMap, range, tap } from 'rxjs';

@Component({
  selector: 'app-form-load',
  templateUrl: './form-load.component.html',
  styleUrls: ['./form-load.component.scss']
})
export class FormLoadComponent {
  private loading: any;

  public isAlertOpen: boolean = false;
  public alertButtons = ['Aceptar'];
  public isLoadRegistros = false;
  public modalAbierto: boolean = false;
  public registrosActualizados = 0;
  public infoRegistros = {
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
    try {
      await this.actualizarFormulario();
    } catch (error) {
      console.error('Error al cargar formulario:', error);
      await this.showToastError();
    }
  }

  private async actualizarFormulario() {
    try {
      const respuestaFicha: any = await this.datosService
        .loadDataForm()
        .toPromise();
      localStorage.setItem('form', JSON.stringify(respuestaFicha?.data));

      const mapeoResponse = await this.datosService
        .obtenerMapeoExcel(respuestaFicha?.data?.id)
        .toPromise();

      localStorage.setItem('mapeo_excel', JSON.stringify(mapeoResponse));

      const toast = await this.toastController.create({
        message: 'Ficha actualizada',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      return respuestaFicha?.data?.id;
    } catch (error) {
      console.error('Error al actualizar formulario:', error);
      await this.showToastError();
    }
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
      message: 'Registros guardados exitosamente',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  private async iniciarCarga(): Promise<void> {
    this.loading = null;
    this.loading = await this.loadingCtrl
      .create({
        message: 'Cargando, por favor espere',
        spinner: 'circles'
      })
      .then(loading => loading.present());
  }

  public setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  public async cargarRegistros(): Promise<void> {
    try {
      const fichaId = await this.actualizarFormulario();
      if (!fichaId) {
        const toast = await this.toastController.create({
          message: 'Esta ficha no tiene datos que cargar',
          duration: 3000,
          color: 'warning'
        });
        await toast.present();
        return;
      }

      this.datosService.obtenerRegistrosCarga(fichaId, 1, 1).subscribe(
        async (respuesta: IHttpResponse<IRespuestaRegistrosCarga>) => {
          this.infoRegistros = {
            currentPage: 1,
            totalItems: respuesta.data.count,
            totalPages: respuesta.data.totalPages
          };

          const alert = await this.alertController.create({
            header: 'Carga de Registros',
            message: `Se cargarán ${this.infoRegistros.totalItems.toLocaleString(
              'es-CO'
            )} registros. Este proceso puede tardar varios minutos. ¿Desea continuar?`,
            buttons: [
              {
                text: 'No',
                role: 'cancel'
              },
              {
                text: 'Sí',
                handler: async () => {
                  this.isLoadRegistros = true;

                  await this.datosService.initializePersistenceService();
                  await this.actualizarRegistros(fichaId);
                  await this.actualizarFormulario();
                }
              }
            ]
          });

          await alert.present();
        },
        async (error: any) => {
          if (error.status === 404) {
            const toast = await this.toastController.create({
              message:
                'No hay ficha activa disponible. Por favor, contacte al administrador.',
              duration: 3000,
              color: 'danger'
            });
            await toast.present();
          } else {
            await this.showToastError();
          }
        }
      );
    } catch (error) {
      console.error('Error al actualizar mapeo:', error);
      await this.showToastError();
    }
  }

  private async actualizarRegistros(fichaId: number) {
    try {
      await this.datosService.borrarRegistros();

      const limite = 100;
      const totalPages = Math.ceil(this.infoRegistros.totalItems / limite);

      range(1, totalPages)
        .pipe(
          concatMap(pagina =>
            this.datosService
              .obtenerRegistrosCarga(fichaId, pagina, limite)
              .pipe(
                tap((respuesta: IHttpResponse<IRespuestaRegistrosCarga>) => {
                  if (respuesta?.data?.rows) {
                    this.registrosActualizados += respuesta.data.rows.length;
                    this.datosService.guardarRegistros(respuesta.data.rows);
                  }
                })
              )
          )
        )
        .subscribe(
          () => {
            this.showToastSuccess();
          },
          async (error: any) => {
            console.error('Error al actualizar registros:', error);
            await this.showToastError();
            this.isLoadRegistros = false;
          }
        );
    } catch (error) {
      console.error('Error al borrar registros:', error);
      await this.showToastError();
      this.isLoadRegistros = false;
    }
  }
}
