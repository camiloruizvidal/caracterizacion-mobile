import { IFamilyCard } from '../formgenerator/interfaces/interface';
import { TestService } from './../formgenerator/services/test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public formDinamic!: IFamilyCard;

  constructor(private testService: TestService) {}

  ngOnInit() {
    this.testService.getDataTest().subscribe((response: IFamilyCard) => {
      this.formDinamic = response;
    })
  }

}
