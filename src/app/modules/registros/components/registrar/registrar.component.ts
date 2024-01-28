import { IFamilyCard } from 'src/app/modules/formgenerator/interfaces/interface';
import { RegistrosService } from './../../services/registros.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  constructor(private registrosService: RegistrosService) {}

  public card!: IFamilyCard;

  async ngOnInit() {
    this.registrosService.loadForms().then((familyCard: IFamilyCard) => {
      this.card = familyCard;
    });
  }
  public saveData(data: any) {
    console.log({data});
  }
}
