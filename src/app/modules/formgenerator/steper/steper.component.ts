import { Component, Input, OnInit } from '@angular/core';
import { IFamilyCard, IStepers } from '../interfaces/interface';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.scss'],
})
export class SteperComponent  implements OnInit {

  @Input() dataCard!: IFamilyCard;
  public familyCards!: IStepers[];

  constructor() { }

  ngOnInit() {
    this.familyCards = this.dataCard.familyCard;
  }

}
