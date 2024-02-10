import {
  ICodes,
  IEventSteper,
  IFamilyCard,
  IFamilyCardSave,
  IStepers,
  IUser
} from 'src/app/modules/formgenerator/interfaces/interface';
import { RegistrosService } from '../../services/registros.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/modules/login/services/login/login.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent implements OnInit {
  public card!: IFamilyCardSave;
  public estados: string[] = ['familyCard', 'personCard'];
  public estado: string = this.estados[0];
  public currentCode: number = 1;

  private dataSaveCard!: IFamilyCardSave;
  private idRegister: number;
  private indexCard: number;
  private userDate: IUser;

  constructor(
    private registrosService: RegistrosService,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
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
    this.idRegister = 0;
    this.indexCard =
      this.route.snapshot.paramMap.get('indexCard') === null
        ? -1
        : Number(this.route.snapshot.paramMap.get('indexCard'));
  }

  async ngOnInit() {
    this.cdRef.detectChanges();
    this.card = await this.registrosService.loadRegister(this.indexCard);
    this.userDate = await this.loginService.getCurrentUser();
    this.currentCode = this.card.code;
    //this.loadOldData();
  }

  private async loadOldData(): Promise<void> {
    if (this.idRegister > -1) {
      this.dataSaveCard = await this.registrosService.loadRegister(
        this.idRegister
      );
      this.estado = this.estados[1];
    }
  }

  public saveData(event: IEventSteper) {
    const { data } = event;
    if (this.estado === this.estados[0]) {
      this.dataSaveCard.data.familyCard = data;
      this.estado = this.estados[1];
      this.idRegister = this.registrosService.newRegister(this.dataSaveCard);
      this.loginService.nextCode();
      this.router.navigate(['/registros/nuevo/' + this.idRegister]);
    } else {
      this.dataSaveCard.data.personCard.push(data);
      this.registrosService.updateRegister(this.idRegister, this.dataSaveCard);
      this.router.navigate(['/registros/nuevo/'], { replaceUrl: true });
    }
  }
}
