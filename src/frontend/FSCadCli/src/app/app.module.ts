import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ClienteModule } from './cliente/cliente.module';
import { UsuarioModule } from './usuario/usuario.module';
import { LoginModule } from './login/login.module';
import { MenuModule } from './menu/menu.module';


import {AppSettingsService} from './config/app-settings.service';
import {UserService} from './login/user.service';
import {LoggedInGuard} from './login/logged-in.guard';
import {GlobalEventsManagerService} from './shared/global-events-manager.service';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    UsuarioModule,
    ClienteModule,
    LoginModule,
    MenuModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent,  canActivate: [LoggedInGuard] },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]),
  ],
  providers: [UserService, AppSettingsService, LoggedInGuard, GlobalEventsManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
