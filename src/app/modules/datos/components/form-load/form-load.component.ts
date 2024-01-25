import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../service/datos/datos.service';
import { IFamilyCard, IHttpResponse } from 'src/app/modules/formgenerator/interfaces/interface';

@Component({
  selector: 'app-form-load',
  templateUrl: './form-load.component.html',
  styleUrls: ['./form-load.component.scss'],
})
export class FormLoadComponent {

  constructor(private datosService: DatosService) { }

  public cargarFormulario(): void {
    this.datosService.loadDataForm().subscribe((response: IHttpResponse<IFamilyCard>) => {
      this.datosService.saveDataForm(response.data);
    })
  }
}
