import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../service/datos/datos.service';
import {
  IFamilyCard,
  IHttpResponse
} from 'src/app/modules/formgenerator/interfaces/interface';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-load',
  templateUrl: './form-load.component.html',
  styleUrls: ['./form-load.component.scss']
})
export class FormLoadComponent {
  private loading: any;

  constructor(
    private datosService: DatosService,
    private loadingCtrl: LoadingController
  ) {}

  private async startLoading(): Promise<void> {
    this.loading = null;
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando, por favor espere',
      spinner: 'circles'
    });
    this.loading.present();
  }

  private stopLoading(): void {
    this.loading.dismiss();
  }

  public cargarFormulario(): void {
    this.startLoading();
    this.datosService
      .loadDataForm()
      .subscribe((response: IHttpResponse<IFamilyCard>) => {
        this.datosService.saveDataForm(response.data);
        this.stopLoading();
      });
  }
}
