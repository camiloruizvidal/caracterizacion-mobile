import { Component, Input, OnInit } from '@angular/core';
import { ESteperType, IFamilyCard, IStepers } from '../interfaces/interface';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.scss'],
})
export class SteperComponent  implements OnInit {

  @Input() dataSteper!: IStepers[];

  constructor() { }

  ngOnInit() {
    console.log(this.dataSteper)
  }

  public get SteperType(): typeof ESteperType {
    return ESteperType;
  }

}
