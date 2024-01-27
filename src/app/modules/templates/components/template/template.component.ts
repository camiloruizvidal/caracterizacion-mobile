import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent {

  constructor(private menuController: MenuController) {}

  public closeMenu() {
    this.menuController.close();
  }

}
