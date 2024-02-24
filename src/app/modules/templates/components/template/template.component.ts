import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private menuController: MenuController,
    private router: Router
  ) {}

  public redirectTo(url: string): void {
    this.menuController.close();
    this.router.navigate([url], { replaceUrl: true });
  }

  get isShowMenu(): boolean {
    return window.location.pathname !== '/login';
  }
}
