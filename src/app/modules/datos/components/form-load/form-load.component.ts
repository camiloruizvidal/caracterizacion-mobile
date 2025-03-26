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
    try {
      await this.actualizarFormulario();
    } catch (error) {
      console.error('Error al cargar formulario:', error);
      await this.showToastError();
    }
  }

  private async actualizarFormulario() {
    try {
      // 1. Cargar el formato de la ficha
      //TODO revisar interface
      const respuestaFicha: any = await this.datosService
        .loadDataForm()
        .toPromise();
      console.log('Formato ficha cargado:', respuestaFicha?.data);
      localStorage.setItem('form', JSON.stringify(respuestaFicha?.data));

      // 2. Cargar el mapeo de Excel
      const mapeoResponse = await this.datosService
        .obtenerMapeoExcel(respuestaFicha?.data?.id || 0)
        .toPromise();
      console.log('Mapeo Excel cargado:', mapeoResponse);
      localStorage.setItem('mapeo_excel', JSON.stringify(mapeoResponse));

      // 3. Cargar los registros de carga masiva
      const registrosResponse = await this.datosService
        .obtenerRegistrosCarga(respuestaFicha?.data?.id || 0)
        .toPromise();
      console.log('Registros de carga masiva cargados:', registrosResponse);
      localStorage.setItem(
        'registros_carga',
        JSON.stringify(registrosResponse)
      );
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
      message: 'Datos cargados con éxito',
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
}
