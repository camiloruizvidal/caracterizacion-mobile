import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ICategoria,
  IPregunta,
  IAlertaConfig,
  IClasificacionAlerta
} from '../../interfaces/interface';

@Component({
  selector: 'app-ponderado-categoria',
  templateUrl: './ponderado-categoria.component.html',
  styleUrls: ['./ponderado-categoria.component.scss']
})
export class PonderadoCategoriaComponent implements OnChanges {
  @Input() categoria!: ICategoria;
  public ponderado: number = 0;
  public color: string = '';
  public nivelRiesgo: string = '';
  public mostrarPonderado: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoria']) {
      this.verificarAlertas();
      this.calcularPonderado();
    }
  }

  private verificarAlertas() {
    this.mostrarPonderado =
      this.categoria?.alerta?.genera_alerta === true &&
      Array.isArray(this.categoria?.alerta?.clasificaciones) &&
      this.categoria.alerta.clasificaciones.length > 0;

    if (this.mostrarPonderado) {
      this.asignarColorYNivel();
    }
  }

  private calcularPonderado() {
    if (!this.categoria?.values?.length) return;

    let sumaPonderados = 0;
    let cantidadPreguntas = 0;

    this.categoria.values.forEach((pregunta: IPregunta) => {
      if (
        pregunta.alerta?.genera_alerta &&
        pregunta.alerta?.valores_alerta &&
        pregunta.value
      ) {
        const peso = pregunta.alerta.peso || 1;
        let valor = 0;

        if (
          typeof pregunta.value === 'string' ||
          typeof pregunta.value === 'boolean'
        ) {
          valor =
            pregunta.alerta.valores_alerta[pregunta.value.toString()] || 0;
        } else if (Array.isArray(pregunta.value)) {
          const valores = pregunta.value.map(
            v => pregunta.alerta?.valores_alerta?.[v] || 0
          );
          valor = Math.max(...valores);
        }

        sumaPonderados += valor * peso;
        cantidadPreguntas++;
      }
    });

    if (cantidadPreguntas > 0) {
      this.ponderado = Math.round(sumaPonderados / cantidadPreguntas);
    }
    this.asignarColorYNivel();
  }

  private asignarColorYNivel() {
    const clasificaciones = this.categoria.alerta?.clasificaciones || [];
    const clasificacion = clasificaciones.find(
      (clasificacion: IClasificacionAlerta) =>
        this.ponderado >= clasificacion.rango_minimo &&
        this.ponderado <= clasificacion.rango_maximo
    );

    if (clasificacion) {
      this.color = clasificacion.color;
      this.nivelRiesgo = clasificacion.nombre;
    } else {
      this.color = '#CCCCCC';
      this.nivelRiesgo = 'Sin clasificar';
    }
  }
}
