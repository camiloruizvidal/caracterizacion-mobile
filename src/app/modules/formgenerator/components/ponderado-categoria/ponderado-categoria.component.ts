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

  ngOnChanges(changes: SimpleChanges) {
    console.log({ changes });
    if (changes['categoria']) {
      this.calcularPonderado();
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

        // Para preguntas tipo select o check
        if (
          typeof pregunta.value === 'string' ||
          typeof pregunta.value === 'boolean'
        ) {
          valor =
            pregunta.alerta.valores_alerta[pregunta.value.toString()] || 0;
        }
        // Para preguntas tipo select múltiple
        else if (Array.isArray(pregunta.value)) {
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
      this.asignarColor();
    }
  }

  private asignarColor() {
    const clasificaciones = this.categoria.alerta?.clasificaciones || [];
    const clasificacion = clasificaciones.find(
      (c: IClasificacionAlerta) =>
        this.ponderado >= c.rango_minimo && this.ponderado <= c.rango_maximo
    );
    this.color = clasificacion?.color || '#CCCCCC';
  }
}
