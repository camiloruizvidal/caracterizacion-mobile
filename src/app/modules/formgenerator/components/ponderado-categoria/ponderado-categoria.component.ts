import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
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
  @Output() planesChange = new EventEmitter<string[]>();

  public ponderado: number = 0;
  public color: string = '';
  public nivelRiesgo: string = '';
  public mostrarPonderado: boolean = false;
  public planesCuidado: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    this.verificarAlertas();
    this.calcularPonderado();
    this.obtenerPlanesCuidado();
  }

  private verificarAlertas() {
    const tieneClasificaciones = Boolean(
      this.categoria?.alerta?.clasificaciones &&
        Array.isArray(this.categoria?.alerta?.clasificaciones) &&
        this.categoria?.alerta?.clasificaciones.length > 0
    );

    this.mostrarPonderado = Boolean(
      this.categoria?.alerta?.genera_alerta === true && tieneClasificaciones
    );

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
            pregunta.alerta.valores_alerta[pregunta.value.toString()]?.valor ||
            0;
        } else if (Array.isArray(pregunta.value)) {
          const valores = pregunta.value.map(
            v => pregunta.alerta?.valores_alerta?.[v]?.valor || 0
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

  private obtenerPlanesCuidado() {
    const todosLosPlanes: string[] = [];

    // 1. Obtener planes de cuidado de la clasificación actual
    const clasificaciones = this.categoria?.alerta?.clasificaciones || [];
    const clasificacionActual = clasificaciones.find(
      (clasificacion: IClasificacionAlerta) =>
        this.ponderado >= clasificacion.rango_minimo &&
        this.ponderado <= clasificacion.rango_maximo
    );

    if (clasificacionActual?.planes_cuidado) {
      todosLosPlanes.push(...clasificacionActual.planes_cuidado);
    }

    // 2. Obtener planes de cuidado de las preguntas individuales
    if (this.categoria?.values) {
      this.categoria.values.forEach((pregunta: IPregunta) => {
        if (
          pregunta.alerta?.genera_alerta &&
          pregunta.alerta?.valores_alerta &&
          pregunta.value
        ) {
          if (
            typeof pregunta.value === 'string' ||
            typeof pregunta.value === 'boolean'
          ) {
            const valorAlerta =
              pregunta.alerta.valores_alerta[pregunta.value.toString()];
            if (valorAlerta?.planes_cuidado) {
              todosLosPlanes.push(...valorAlerta.planes_cuidado);
            }
          } else if (Array.isArray(pregunta.value)) {
            pregunta.value.forEach(valor => {
              const valorAlerta = pregunta.alerta?.valores_alerta?.[valor];
              if (valorAlerta?.planes_cuidado) {
                todosLosPlanes.push(...valorAlerta.planes_cuidado);
              }
            });
          }
        }
      });
    }

    // 3. Agregar planes de cuidado adicionales si existen
    if (this.categoria?.planes_cuidado?.length) {
      todosLosPlanes.push(...this.categoria.planes_cuidado);
    }

    // Eliminar duplicados y actualizar los planes de cuidado
    this.planesCuidado = [...new Set(todosLosPlanes)];
  }

  private asignarColorYNivel() {
    const clasificaciones = this.categoria?.alerta?.clasificaciones || [];
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

  // Método para manejar cambios en el textarea
  public onPlanChange(index: number, event: any): void {
    const valor = event.target.value.trim();
    this.planesCuidado[index] = valor;
    this.emitirCambios();
  }

  // Métodos públicos para la UI
  public agregarPlan(): void {
    this.planesCuidado.push('');
    this.emitirCambios();
  }

  public borrarPlan(index: number): void {
    this.planesCuidado.splice(index, 1);
    this.emitirCambios();
  }

  private emitirCambios(): void {
    // Filtrar planes vacíos antes de emitir
    const planesFiltrados = this.planesCuidado.filter(
      plan => plan.trim() !== ''
    );
    this.planesChange.emit(planesFiltrados);

    // Actualizar la categoría directamente
    if (this.categoria) {
      this.categoria.planes_cuidado = planesFiltrados;
    }
  }
}
