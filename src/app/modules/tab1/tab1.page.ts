import { FichaService } from './../tarjetas/services/ficha/ficha.service';
import { PersonasService } from './../tarjetas/services/personas/personas.service';
import { IFamilyCard, IHttpResponse } from '../formgenerator/interfaces/interface';
import { TestService } from './../formgenerator/services/test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public formDinamic!: IFamilyCard;

  constructor(
    private testService: TestService,
    private personasService: PersonasService,
    private fichaService :FichaService
  ) {}

  async ngOnInit() {

    this.fichaService.getFicha().subscribe((response: IHttpResponse<IFamilyCard>) => {
      this.formDinamic = response.data;
    })

  }

}
