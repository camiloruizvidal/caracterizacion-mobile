import {
  IFamilyCard,
  IFamilyCardSave,
  IStepers
} from 'src/app/modules/formgenerator/interfaces/interface';
import { RegistrosService } from './../../services/registros.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  constructor(
    private registrosService: RegistrosService,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idRegister =
      this.route.snapshot.paramMap.get('id') === null
        ? -1
        : Number(this.route.snapshot.paramMap.get('id'));
  }

  public card!: IFamilyCard;
  public estados: string[] = ['familyCard', 'personCard'];
  public estado: string = this.estados[0];
  public currentCode: number = 1;
  public myCodes = [
    { start: 1, finish: 3 },
    { start: 110, finish: 200 },
    { start: 400, finish: 500 }
  ];

  private dataSaveCard!: IFamilyCardSave;
  private idRegister: number;

  async ngOnInit() {
    this.registrosService.loadForms().then((familyCard: IFamilyCard) => {
      this.card = familyCard;
      this.cdRef.detectChanges();
      this.inicialiceCard(familyCard);
      this.loadOldData();
    });
  }

  private inicialiceCard(familyCard: IFamilyCard): void {
    this.dataSaveCard = {
      version: familyCard.version,
      dateLastVersion: familyCard.dateLastVersion,
      dateRegister: new Date(),
      data: {
        familyCard: [],
        personCard: []
      }
    };
  }

  private loadOldData(): void {
    if (this.idRegister > -1) {
      this.registrosService.loadRegister(this.idRegister);
      this.estado = this.estados[1];
    }
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

  public saveData(data: IStepers[]) {
    if (this.estado === this.estados[0]) {
      this.dataSaveCard.data.familyCard = data;
      this.estado = this.estados[1];
      this.idRegister = this.registrosService.newRegister(this.dataSaveCard);
      this.router.navigate(['/registros/nuevo/' + this.idRegister]);
    } else {
      this.dataSaveCard.data.personCard.push(data);
      this.registrosService.updateRegister(this.idRegister, this.dataSaveCard);
    }
    console.clear();
    console.log(this.dataSaveCard);
  }
}
