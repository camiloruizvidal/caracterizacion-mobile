import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { LocalDataService } from './services/local-data/local-data.service';
import { LoginService } from './services/login/login.service';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  providers: [ SQLite, LocalDataService, LoginService ]
})
export class LoginModule { }
