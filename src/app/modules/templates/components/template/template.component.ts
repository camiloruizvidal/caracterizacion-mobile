import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {
  constructor(private menuController: MenuController, private router: Router) {}

  public redirectTo(url: string): void {
    this.menuController.close();
    this.router.navigate([url], { replaceUrl: true });
  }
}
