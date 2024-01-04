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
        title: 'Tarjeta Familiar',
        values: [{
          columnName: 'prueba_1_texto',
          order: 1,
          label: 'Campo de prueba 1',
          description: 'Este campo es de prueba, asi que no tiene nada que ver',
          type: 'text',
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
          type: 'textarea',
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
          type: 'check',
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
          type: 'check',
          options: { valueTrue: 'Sí', valueFalse: 'No'},
          default: true,
          visibility: {
            isDepent: true,
            rules: [
              [{
                columnDepend: 'columnName',
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
        title: 'Tarjeta Familiar',
        values: [{
          columnName: 'prueba_1_texto',
          order: 1,
          label: 'Campo de prueba 1',
          description: 'Este campo es de prueba, asi que no tiene nada que ver',
          type: 'text',
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
          type: 'textarea',
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
          type: 'check',
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
          type: 'check',
          options: { valueTrue: 'Sí', valueFalse: 'No'},
          default: true,
          visibility: {
            isDepent: true,
            rules: [
              [{
                columnDepend: 'columnName',
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
