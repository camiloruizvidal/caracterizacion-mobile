import { ESteperType } from './../interfaces/interface';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFamilyCard } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() {}

  getDataTest(): Observable<IFamilyCard> {

    const data: IFamilyCard = {

      version: '1.0.0',
      dateLastVersion: new Date(),
      familyCard: [{
        title: 'Tarjeta Familiar step 1',
        values: [{
          columnName: 'prueba_1_texto',
          order: 1,
          label: 'Campo de prueba 1',
          description: 'Este campo es de prueba, asi que no tiene nada que ver',
          type: ESteperType.Text,
          options: null,
          default: '',
          visibility: {
            isDepent: false,
            rules: null,
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        },{
          columnName: 'prueba_2_texto_largo',
          order: 2,
          label: 'Campo de prueba 2',
          description: 'Este campo es de prueba para un texto largo, asi que no tiene nada que ver',
          type: ESteperType.TextArea,
          options: null,
          default: '',
          visibility: {
            isDepent: false,
            rules: null,
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        },{
          columnName: 'prueba_3_check_box',
          order: 3,
          label: 'Campo de prueba 3',
          description: 'Este campo es de prueba para un texto largo, asi que no tiene nada que ver',
          type: ESteperType.Check,
          options: { valueTrue: 'Sí', valueFalse: 'No'},
          default: true,
          visibility: {
            isDepent: false,
            rules: null,
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        },{
          columnName: 'prueba_4_texto_largo_dependiente',
          order: 4,
          label: 'Campo de prueba 4, campo dependiente de 3',
          description: 'Este campo es de prueba para un texto largo, asi que no tiene nada que ver',
          type: ESteperType.TextArea,
          options: null,
          default: true,
          visibility: {
            isDepent: true,
            rules: [
              [{
                columnDepend: 'prueba_3_check_box',
                rule: '=',
                value: 'Sí'
              }]
            ],
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        }]
      },{
        title: 'Tarjeta Familiar step 2',
        values: [{
          columnName: 'prueba_5_texto',
          order: 5,
          label: 'Campo de prueba 5',
          description: 'Este campo es de prueba, asi que no tiene nada que ver',
          type: ESteperType.Text,
          options: null,
          default: '',
          visibility: {
            isDepent: false,
            rules: null,
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        },{
          columnName: 'prueba_6_texto_largo',
          order: 6,
          label: 'Campo de prueba 6',
          description: 'Este campo es de prueba para un texto largo, asi que no tiene nada que ver',
          type: ESteperType.TextArea,
          options: null,
          default: '',
          visibility: {
            isDepent: false,
            rules: null,
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        },{
          columnName: 'prueba_7_check_box',
          order: 7,
          label: 'Campo de prueba 7',
          description: 'Este campo es de prueba para un texto largo, asi que no tiene nada que ver',
          type: ESteperType.Check,
          options: { valueTrue: 'Sí', valueFalse: 'No'},
          default: true,
          visibility: {
            isDepent: false,
            rules: null,
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        },{
          columnName: 'prueba_8_texto_largo_dependiente',
          order: 8,
          label: 'Campo de prueba 8, campo dependiente de 7',
          description: 'Este campo es de prueba para un texto largo, asi que no tiene nada que ver',
          type: ESteperType.TextArea,
          options: null,
          default: true,
          visibility: {
            isDepent: true,
            rules: [
              [{
                columnDepend: 'prueba_7_check_box',
                rule: '=',
                value: 'Sí'
              }]
            ],
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        }]
      }],
      personCard: [{
        title: 'Tarjeta persona',
        values: [{
          columnName: 'prueba_1_texto',
          order: 1,
          label: 'Campo de prueba 1',
          description: 'Este campo es de prueba, asi que no tiene nada que ver',
          type: ESteperType.Text,
          options: null,
          default: '',
          visibility: {
            isDepent: false,
            rules: null,
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        },{
          columnName: 'prueba_2_texto_largo',
          order: 2,
          label: 'Campo de prueba 2',
          description: 'Este campo es de prueba para un texto largo, asi que no tiene nada que ver',
          type: ESteperType.TextArea,
          options: null,
          default: '',
          visibility: {
            isDepent: false,
            rules: null,
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        },{
          columnName: 'prueba_3_check_box',
          order: 3,
          label: 'Campo de prueba 3',
          description: 'Este campo es de prueba para un texto largo, asi que no tiene nada que ver',
          type: ESteperType.Check,
          options: { valueTrue: 'Sí', valueFalse: 'No'},
          default: true,
          visibility: {
            isDepent: false,
            rules: null,
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        },{
          columnName: 'prueba_4_texto_largo_dependiente',
          order: 4,
          label: 'Campo de prueba 4, campo dependiente de 3',
          description: 'Este campo es de prueba para un texto largo, asi que no tiene nada que ver',
          type: ESteperType.TextArea,
          options: null,
          default: true,
          visibility: {
            isDepent: true,
            rules: [
              [{
                columnDepend: 'prueba_3_check_box',
                rule: '=',
                value: 'Sí'
              }]
            ],
            isShow: true,
          },
          required: {
            isDepend: false,
            rules: null,
            required: true,
          }
        }]
      }]

    };
    return of(data);

  }
}
