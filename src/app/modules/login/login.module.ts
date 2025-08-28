import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login/login.service';
import { LoginRoutingModule } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './components/login/login.component';
import { ServerConfigModalComponent } from './components/server-config-modal/server-config-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, ServerConfigModalComponent],
  imports: [ReactiveFormsModule, IonicModule, CommonModule, LoginRoutingModule, HttpClientModule],
  providers: [LoginService]
})
export class LoginModule {}
