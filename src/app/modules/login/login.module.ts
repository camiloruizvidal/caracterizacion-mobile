import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login/login.service';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  providers: [ LoginService ]
})
export class LoginModule { }
