import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../../services/registros.service';
import { IFamilyCardSave } from 'src/app/modules/formgenerator/interfaces/interface';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  constructor(private registrosService: RegistrosService) {}

  public familiesCards: IFamilyCardSave[] = [];

  async ngOnInit(): Promise<void> {
    this.familiesCards = await this.registrosService.loadAllRegister();
  }

  public seleccionarRegistro(indexFamilyCardSave: number) {
    console.log({ indexFamilyCardSave: this.familiesCards[indexFamilyCardSave] });
  }
}
