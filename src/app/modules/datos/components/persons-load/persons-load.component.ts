import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { DatosService } from './../../service/datos/datos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persons-load',
  templateUrl: './persons-load.component.html',
  styleUrls: ['./persons-load.component.scss'],
})
export class PersonsLoadComponent  implements OnInit {

  constructor(private databaseService: DatabaseService) {
    this.databaseService.setTable('patients');
  }

  ngOnInit() {
    this.loadData();
  }

  public async loadData() {
    const d = await this.databaseService.findAll();
    console.log({d})
  }
}
