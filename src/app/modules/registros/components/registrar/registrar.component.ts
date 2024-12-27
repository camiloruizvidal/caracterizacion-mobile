import {
  ICodes,
  IEventSteperStatus,
  IGrupalCard,
  IGrupalCardSave,
  IStepers,
  IUser
} from 'src/app/modules/formgenerator/interfaces/interface';
import { RegistrosService } from './../../services/registros.service';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/modules/login/services/login/login.service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  @ViewChild('tarjetas', { static: false }) elementRef!: ElementRef;
  public card!: IGrupalCard;
  public estados: string[] = ['grupalData', 'individualData'];
  public estado: string = this.estados[0];
  public currentCode: number = 1;
  public reload: boolean = true;
  public dataSaveCard!: IGrupalCardSave;
  public userDate: IUser;

  private myCodes: ICodes[] = [];
  private idRegister: number;

  constructor(
    private registrosService: RegistrosService,
    private loadingCtrl: LoadingController,
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
        grupalData: [],
        individualData: []
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

  private inicialiceCard(grupalData: IGrupalCard): void {
    this.dataSaveCard = {
      version: grupalData.version,
      dateLastVersion: grupalData.dateLastVersion,
      dateRegister: new Date(),
      code: this.currentCode,
      userId: this.userDate.id,
      data: {
        grupalData: [],
        individualData: []
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

  public async saveData(event: { data: IStepers[]; status: string }) {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando',
      duration: 1000
    });
    loading.present();
    const { data, status } = event;
    if (this.estado === this.estados[0]) {
      this.dataSaveCard.data.grupalData = data;
      this.estado = this.estados[1];
      this.idRegister = this.registrosService.newRegister(this.dataSaveCard);
      this.loginService.nextCode();
      this.router.navigate(['/registros/nuevo/' + this.idRegister]);
    } else {
      this.dataSaveCard.data.individualData.push(data);
      this.registrosService.updateRegister(this.idRegister, this.dataSaveCard);
      if (status === IEventSteperStatus.salir) {
        this.generatePDF();
      } else if (status === IEventSteperStatus.nuevo) {
        this.reload = false;
        setTimeout(() => {
          this.router.navigateByUrl('/registros/nuevo/' + this.idRegister);
          this.reload = true;
        }, 200);
      }
    }
  }

  public generatePDF() {
    let pdf = new jsPDF('p', 'pt', 'letter');
    pdf.setLanguage('es-CO');
    pdf.html(this.elementRef.nativeElement, {
      callback: pdf => {
        pdf.save('Tarjeta Grupal - ' + this.dataSaveCard.code + '.pdf');
        this.router.navigate(['/registros']);
      },
      margin: [30, 0, 30, 0]
    });
  }
}
