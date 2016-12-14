import { Component, OnInit } from '@angular/core';

// import { UserService } from './login/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle: string = 'FanSoft CadCli';
  subTitle: string = 'Seja bem-vindo ao aplicativo Demo';
  // statusLogin: boolean;

  constructor(
    //private _user: UserService
    ) { }

  ngOnInit(): void {
    // this.statusLogin = this._user.isLoggedIn();
  }
}