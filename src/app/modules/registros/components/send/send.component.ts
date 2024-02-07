import { RegistrosService } from 'src/app/modules/registros/services/registros.service';
import { Component, OnInit } from '@angular/core';
import { IFamilyCardSave } from 'src/app/modules/formgenerator/interfaces/interface';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
  public registers: IFamilyCardSave[] = [];
  constructor(private registrosService: RegistrosService) {}

  ngOnInit() {
    this.loadRegister();
  }

  private async loadRegister() {
    this.registers = await this.registrosService.loadAllRegister();
  }

  public async enviarRegistros() {
    this.registers.forEach((register: IFamilyCardSave) => {
      this.registrosService.saveRegister(register).subscribe(response => {
        console.log(response);
      });
    });
  }
}
