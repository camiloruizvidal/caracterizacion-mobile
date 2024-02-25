import {
  ICodes,
  IEventSteperStatus,
  IFamilyCard,
  IFamilyCardSave,
  IStepers,
  IUser
} from 'src/app/modules/formgenerator/interfaces/interface';
import { RegistrosService } from './../../services/registros.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/modules/login/services/login/login.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  public card!: IFamilyCard;
  public estados: string[] = ['familyCard', 'personCard'];
  public estado: string = this.estados[0];
  public currentCode: number = 1;
  public reload: boolean = true;

  private myCodes: ICodes[] = [];
  private dataSaveCard!: IFamilyCardSave;
  private idRegister: number;
  private userDate: IUser;

  constructor(
    private registrosService: RegistrosService,
    private loginService: LoginService,
    private cdRef: ChangeDetectorRef,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataSaveCard = {
      version: '',
      dateLastVersion: new Date(),
      dateRegister: new Date(),
      code: 0,
      userId: 0,
      data: {
        familyCard: [],
        personCard: []
      }
    };

    this.userDate = {
      id: 0,
      username: '',
      nombrePrimero: '',
      nombreSegundo: null,
      apellidoPrimero: '',
      apellidoSegundo: null,
      documento: '',
      documentoTipoId: 0,
      currentCode: 0,
      codes: []
    };
    this.idRegister =
      this.route.snapshot.paramMap.get('id') === null
        ? -1
        : Number(this.route.snapshot.paramMap.get('id'));
  }

  async ngOnInit() {
    this.userDate = await this.loginService.getCurrentUser();
    this.myCodes = this.userDate.codes;
    this.currentCode = this.userDate.currentCode;

    this.card = await this.registrosService.loadForms();
    this.inicialiceCard(this.card);
    this.loadOldData();
    this.cdRef.detectChanges();
  }

  private inicialiceCard(familyCard: IFamilyCard): void {
    this.dataSaveCard = {
      version: familyCard.version,
      dateLastVersion: familyCard.dateLastVersion,
      dateRegister: new Date(),
      code: this.currentCode,
      userId: this.userDate.id,
      data: {
        familyCard: [],
        personCard: []
      }
    };
  }

  private async loadOldData(): Promise<void> {
    if (this.idRegister > -1) {
      this.dataSaveCard = await this.registrosService.loadRegister(
        this.idRegister
      );
      this.estado = this.estados[1];
    }
  }

  public saveData(event: { data: IStepers[]; status: string }) {
    const { data, status } = event;
    if (this.estado === this.estados[0]) {
      this.dataSaveCard.data.familyCard = data;
      this.estado = this.estados[1];
      this.idRegister = this.registrosService.newRegister(this.dataSaveCard);
      this.loginService.nextCode();
      this.router.navigate(['/registros/nuevo/' + this.idRegister]);
    } else {
      this.dataSaveCard.data.personCard.push(data);
      this.registrosService.updateRegister(this.idRegister, this.dataSaveCard);
      if (status === IEventSteperStatus.salir) {
        this.router.navigate(['/registros']);
      } else if (status === IEventSteperStatus.nuevo) {
        this.reload = false;
        setTimeout(() => {
          this.router.navigateByUrl('/registros/nuevo/' + this.idRegister);
          this.reload = true;
        }, 200);
      }
    }
  }
}
