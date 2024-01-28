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

  async ngOnInit() {
    this.registrosService.loadForms().then((familyCard: IFamilyCard) => {
      this.card = familyCard;
      this.cdRef.detectChanges();
    });
  }

  public saveData(data: any) {
    console.log({ data });
  }
}
