import { RegistrosService } from 'src/app/modules/registros/services/registros.service';
import { Component, OnInit } from '@angular/core';
import { IFamilyCardSave } from 'src/app/modules/formgenerator/interfaces/interface';
import { forkJoin } from 'rxjs';

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

  public enviarRegistros() {
    const observables = this.registers.map((register: IFamilyCardSave) => {
      return this.registrosService.saveRegister(register);
    });

    forkJoin(observables).subscribe(responses => {
      const ids = responses.map((response, idx) => {
        return idx;
      });

      this.registers = this.registers.filter(
        (register, index) => !ids.includes(index)
      );
      console.log({ registers: this.registers });
    });
  }
}
