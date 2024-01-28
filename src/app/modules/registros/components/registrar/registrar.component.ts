import { IFamilyCard } from 'src/app/modules/formgenerator/interfaces/interface';
import { RegistrosService } from './../../services/registros.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  constructor(
    private registrosService: RegistrosService,
    private cdRef: ChangeDetectorRef
  ) {}

  public card!: IFamilyCard;
  public estados: string[] = ['tarjetaFamiliar', 'tarjetaPersonal'];
  public estado: string = this.estados[0];
  public currentCode: number = 1;
  public myCodes = [
    { start: 1, finish: 3 },
    { start: 110, finish: 200 },
    { start: 400, finish: 500 }
  ];

  async ngOnInit() {
    this.registrosService.loadForms().then((familyCard: IFamilyCard) => {
      this.card = familyCard;
      this.cdRef.detectChanges();
    });
  }

  public nextCode(): void {
    let found = false;

    for (const codeRange of this.myCodes) {
      if (
        this.currentCode >= codeRange.start &&
        this.currentCode <= codeRange.finish
      ) {
        this.currentCode++;

        if (this.currentCode > codeRange.finish) {
          found = false;
        } else {
          found = true;
        }
        break;
      }
    }

    if (!found && this.myCodes.length > 0) {
      for (let i = 0; i < this.myCodes.length - 1; i++) {
        if (
          this.currentCode >= this.myCodes[i].finish &&
          this.currentCode < this.myCodes[i + 1].start
        ) {
          this.currentCode = this.myCodes[i + 1].start;
          found = true;
          break;
        }
      }

      if (!found) {
        this.currentCode = this.myCodes[0].start;
      }
    }
  }

  public saveData(data: any) {
    console.log({ data });
  }
}
