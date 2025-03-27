import { RegistrosService } from 'src/app/modules/registros/services/registros.service';
import { Component, OnInit } from '@angular/core';
import { IGuardarFormularioGrupal } from 'src/app/modules/formgenerator/interfaces/interface';
import { forkJoin } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
  public registers: IGuardarFormularioGrupal[] = [];
  constructor(
    private registrosService: RegistrosService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadRegister();
  }

  private async loadRegister() {
    this.registers = await this.registrosService.loadAllRegister();
  }

  public enviarRegistros() {
    const observables = this.registers.map(
      (register: IGuardarFormularioGrupal) =>
        this.registrosService.saveRegister(register)
    );

    forkJoin(observables).subscribe({
      next: responses => {
        const ids = responses.map((response, id) => id);

        this.registers = this.registers.filter(
          (register, index) => !ids.includes(index)
        );
        this.registrosService.deleteAllRegister().then(() => {
          this.registers.forEach(register => {
            this.registrosService.saveRegister(register);
          });
        });
      },
      error: async error => {
        console.error('Error al enviar el registro:', error);
        const toast = await this.toastController.create({
          message: 'No se pudo enviar un registro. Por favor.',
          duration: 5000,
          position: 'bottom',
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}
