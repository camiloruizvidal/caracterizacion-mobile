import { Component, Input } from '@angular/core';
import { ISteperValues } from '../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent extends BaseInputComponent {

  constructor() {
    super();
  }

  public get edadTexto() : string  {
    const fechaNacimiento:string = this.valueData;
    if(fechaNacimiento.trim() === '') {
      return '';
    }
    const hoy = moment();
    const fechaNac = moment(fechaNacimiento, 'YYYY-MM-DDTHH:mm:ss');

    const anios = hoy.diff(fechaNac, 'years');
    const meses = hoy.diff(fechaNac, 'months') % 12;
    const dias = hoy.diff(fechaNac, 'days');

    let resultado = '';

    if (anios > 0) {
      resultado += `${anios === 1 ? '1 año' : `${anios} años`}`;
    }

    if (meses > 0) {
      resultado += resultado.length > 0 ? ' ' : '';
      resultado += `${meses === 1 ? '1 mes' : `${meses} meses`}`;
    }

    if (dias > 0) {
      resultado += resultado.length > 0 ? ' ' : '';
      resultado += `${dias === 1 ? '1 día' : `${dias} días`}`;
    }

    return resultado.length > 0 ? resultado : 'Recién nacido';
  }

}
