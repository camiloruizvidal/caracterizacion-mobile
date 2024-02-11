import {
  IEventSteper,
  IFamilyCardSave,
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
  public personCardsTotal: number = 0;
  public personCardsCurrent: number = 0;

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
    this.personCardsTotal = this.card.data.personCard.length;
  }

  public saveData(event: IEventSteper) {
    const { data } = event;
    debugger;
    if (this.estado === this.estados[0]) {
      this.card.data.familyCard = data;
      this.estado = this.estados[1];
      this.idRegister = this.registrosService.newRegister(this.card);
      this.router.navigate(['/registros/nuevo/' + this.idRegister]);
    } else {
      this.card.data.personCard.push(data);
      this.registrosService.updateRegister(this.idRegister, this.card);
      this.router.navigate(['/registros/nuevo/'], { replaceUrl: true });
    }
  }
}
