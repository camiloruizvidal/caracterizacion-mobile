import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IOptionsSelectFilter,
  IPregunta,
  ICategoria,
  IFormatoMapeoExcel
} from '../../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';
import { IonModal, ModalController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DynamicPersistenceService } from 'src/app/modules/datos/service/persistence/registros/registros-persistence.service';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss']
})
export class SelectFilterComponent
  extends BaseInputComponent
  implements OnInit
{
  constructor(
    private modalCtrl: ModalController,
    private databaseService: DatabaseService,
    private dynamicPersistenceService: DynamicPersistenceService
  ) {
    super();
  }

  public modalIsOpen = false;
  public searchControl = new FormControl();
  private data: any[] = [];
  public resultadosFiltrados: any[] = [];
  private mapeoExcel!: IFormatoMapeoExcel;
  @ViewChild(IonModal) modal!: IonModal;

  public get options(): IOptionsSelectFilter {
    return this.steperValue.options as IOptionsSelectFilter;
  }

  public get isEmptySearch(): boolean {
    return (
      this.searchControl.value === null || this.searchControl.value.trim() == ''
    );
  }
  public get isNotFound(): boolean {
    return this.isEmptySearch && this.resultadosFiltrados.length === 0;
  }

  async ngOnInit() {
    this.mapeoExcel = this.databaseService.getMapeoExcel();
    await this.loadData();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(newValue => {
        this.filtrar(newValue);
      });
  }

  public filtrar(valorBusqueda: string): void {
    if (valorBusqueda.trim() === '') {
      this.resultadosFiltrados = [];
      return;
    }

    try {
      const columnasPermitidas = this.mapeoExcel.columnasExcel;

      this.dynamicPersistenceService
        .searchByField(valorBusqueda)
        .then(result => {
          debounceTime;
          this.resultadosFiltrados = result.map(item => {
            const itemFiltrado: any = {};
            columnasPermitidas.forEach(columna => {
              if (item[columna] !== undefined) {
                itemFiltrado[columna] = item[columna];
              }
            });
            return itemFiltrado;
          });
        })
        .catch(error => {
          console.error('Error en la búsqueda:', error);
        });
    } catch (error) {
      console.error('Error al obtener el mapeo:', error);
    }
  }

  public cumpleCriterio(item: any, valorBusqueda: string): boolean {
    const keys = [this.options.item_busqueda];
    return keys.some(
      key =>
        item[key] &&
        item[key].toString().toLowerCase().includes(valorBusqueda.toLowerCase())
    );
  }

  private async loadData(): Promise<void> {
    this.databaseService.setTable(this.options.tabla_destino);
    this.data = await this.databaseService.findAll();
  }

  public agregarNuevo(): void {
    this.steperValue.value = this.searchControl.value;
    this.cancel();
  }

  public formatItemToShow(item: any): string {
    const result = this.options.formato_listado_mostrar.replace(
      /\${(.*?)}/g,
      (match, params) => item[params.trim()]
    );
    return result;
  }

  public seleccionarItem(item: any): void {
    this.formValue.forEach((element: ICategoria, indexForm: number) => {
      this.updateValues(element, item, indexForm);
    });

    this.cancel();
  }

  private updateValues(
    element: ICategoria,
    item: any,
    indexForm: number
  ): void {
    element?.values?.forEach((value: IPregunta, indexValue: number) => {
      const itemValue = this.options.relaciones.find(
        name => name.origen === value.columnName
      );
      const values = this.formValue[indexForm]?.values;
      if (itemValue && values?.[indexValue]) {
        values[indexValue].value = item[itemValue.destino];
      }
    });
  }

  public abrirModal(): void {
    this.modalIsOpen = true;
    this.clean();
  }

  public cancel(): void {
    this.modalIsOpen = false;
    this.modal.dismiss(null, 'cancel');
    this.clean();
  }

  public confirm(): void {
    this.modalIsOpen = false;
    this.modal.dismiss('null', 'confirm');
    this.clean();
  }

  private clean(): void {
    this.resultadosFiltrados = [];
    this.searchControl.setValue('');
  }
}
