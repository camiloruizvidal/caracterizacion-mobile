import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateComponent } from './components/template/template.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, HeaderComponent, TemplateComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
  exports: [NavbarComponent, HeaderComponent, TemplateComponent]
})
export class TemplatesModule {}
