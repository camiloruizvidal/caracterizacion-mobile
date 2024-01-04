import { Component, Input, OnInit } from '@angular/core';
import { IFamilyCard } from '../interfaces/interface';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.scss'],
})
export class SteperComponent  implements OnInit {

  @Input() dataCard!: IFamilyCard;

  constructor() { }

  ngOnInit() {
    console.log({dataCard: this.dataCard});
  }

}
