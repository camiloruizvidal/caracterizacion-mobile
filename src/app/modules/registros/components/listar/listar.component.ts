import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../../services/registros.service';
import { IGrupalCardSave } from 'src/app/modules/formgenerator/interfaces/interface';
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

  public familiesCards: IGrupalCardSave[] = [];

  public countPersons(familiyCard: IGrupalCardSave): number {
    return familiyCard.data.individualData.length;
  }

  ngOnInit() {
    this.loadData();
    setInterval(async () => {
      await this.loadData();
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
