import { Component, OnInit } from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';
import { IRutasAtencion } from '../../../interfaces/interface';

@Component({
  selector: 'app-ruta-atencion',
  templateUrl: './ruta-atencion.component.html',
  styleUrls: ['./ruta-atencion.component.scss']
})
export class RutaAtencionComponent extends BaseInputComponent {
  constructor() {
    super();
  }

  public edad: number = 0;

  private calcularEdad(fechaNacimiento: string): number {
    const fechaNac = new Date(fechaNacimiento);
    const ahora = new Date();
    const edad = ahora.getFullYear() - fechaNac.getFullYear();

    if (
      ahora.getMonth() < fechaNac.getMonth() ||
      (ahora.getMonth() === fechaNac.getMonth() &&
        ahora.getDate() < fechaNac.getDate())
    ) {
      return edad - 1;
    } else {
      return edad;
    }
  }

  public get getOptions(): IRutasAtencion[] {
    const opcions: { [key: string]: any } = {};
    const optionsValues: any = this.steperValue?.options ?? [];
    const valuesToFilter = ['genero', 'fecha_nacimiento'];
    const persona =
      this.formValue.find(card => card.table === 'pacientes')?.values ?? [];
    return [];
    //persona
    //  .filter(value => valuesToFilter.includes(value.columnName))
    //  .forEach(value => {
    //    opcions[value.columnName] = value.value;
    //  });
    //
    //this.edad = this.calcularEdad(opcions['fecha_nacimiento']);
    //delete opcions['fecha_nacimiento'];
    //
    //return optionsValues.filter((objeto: any) => {
    //  return (
    //    Object.entries(opcions).every(
    //      ([key, value]) => objeto[key] === value
    //    ) &&
    //    objeto.edad_inicial <= this.edad &&
    //    objeto.edad_final >= this.edad
    //  );
    //});
  }
}
