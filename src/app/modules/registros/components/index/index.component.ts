import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public tieneFichas = false;

  constructor(private registrosService: RegistrosService) {}

  async ngOnInit() {
    const ficha = await this.registrosService.loadForms();
    this.tieneFichas =
      ficha !== null && ficha !== undefined && Object.keys(ficha).length > 0;
  }
}
