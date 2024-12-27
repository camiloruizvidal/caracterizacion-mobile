import { RegistrosService } from 'src/app/modules/registros/services/registros.service';
import { Component, OnInit } from '@angular/core';
import { IGrupalCardSave } from 'src/app/modules/formgenerator/interfaces/interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
  public registers: IGrupalCardSave[] = [];
  constructor(private registrosService: RegistrosService) {}

  ngOnInit() {
    this.loadRegister();
  }

  private async loadRegister() {
    this.registers = await this.registrosService.loadAllRegister();
  }

  public enviarRegistros() {
    const observables = this.registers.map((register: IGrupalCardSave) =>
      this.registrosService.saveRegister(register)
    );

    forkJoin(observables).subscribe(responses => {
      const ids = responses.map((response, id) => id);

      this.registers = this.registers.filter(
        (register, index) => !ids.includes(index)
      );
      this.registrosService.deleteAllRegister().then(() => {
        this.registers.forEach(register => {
          this.registrosService.saveRegister(register);
        });
      });
    });
  }
}
