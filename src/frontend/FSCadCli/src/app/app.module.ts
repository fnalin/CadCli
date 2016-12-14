import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ClienteModule } from './cliente/cliente.module';
import { LoginModule } from './login/login.module';
import { MenuModule } from './menu/menu.module';


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
    ClienteModule,
    LoginModule,
    MenuModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent,  canActivate: [LoggedInGuard] },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]),
  ],
  providers: [UserService, LoggedInGuard, GlobalEventsManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
