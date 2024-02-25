import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../../services/registros.service';
import { IFamilyCardSave } from 'src/app/modules/formgenerator/interfaces/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  constructor(
    private registrosService: RegistrosService,
    private router: Router
  ) {}

  public familiesCards: IFamilyCardSave[] = [];

  public countPersons(familiyCard: IFamilyCardSave): number {
    return familiyCard.data.personCard.length;
  }

  async ngOnInit(): Promise<void> {
    this.loadData();
    setTimeout(() => {
      this.loadData();
    }, 3000);
  }

  private async loadData() {
    this.familiesCards = await this.registrosService.loadAllRegister();
  }

  public seleccionarRegistro(indexFamilyCardSave: number) {
    this.router.navigate(['/registros/actualizar/' + indexFamilyCardSave], {
      replaceUrl: true
    });
  }
}
