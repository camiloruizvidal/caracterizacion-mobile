import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IOptionsSelectFilter } from '../../../interfaces/interface';
import { BaseInputComponent } from '../base-input/base-input.component';
import { IonModal, ModalController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
    private databaseService: DatabaseService
  ) {
    super();
  }

  public modalIsOpen = false;
  public searchControl = new FormControl();
  private data: any[] = [];
  public resultadosFiltrados: any[] = [];
  @ViewChild(IonModal) modal!: IonModal;

  public get options(): IOptionsSelectFilter {
    return this.steperValue.options as IOptionsSelectFilter;
  }

  public get isNotFound(): boolean {
    return (
      this.searchControl.value !== null &&
      this.searchControl.value.trim() !== '' &&
      this.resultadosFiltrados.length === 0
    );
  }

  async ngOnInit() {
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
    this.resultadosFiltrados = this.data
      .filter((item, index) => this.cumpleCriterio(item, valorBusqueda))
      .slice(0, 10);
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

  public formatItemToShow(item: any): string {
    const result = this.options.formato_listado_mostrar.replace(
      /\${(.*?)}/g,
      (match, params) => item[params.trim()]
    );
    return result;
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
