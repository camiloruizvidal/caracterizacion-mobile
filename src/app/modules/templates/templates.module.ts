import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateComponent } from './components/template/template.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TemplateComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
  exports: [TemplateComponent]
})
export class TemplatesModule {}
