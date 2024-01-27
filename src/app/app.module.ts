import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/login/login.module';
import { DatosModule } from './modules/datos/datos.module';
import { DatabaseService } from './utils/services/database/database.service';
import { TemplatesModule } from './modules/templates/templates.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    LoginModule,
    TemplatesModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    DatosModule
  ],
  providers: [
    DatabaseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
