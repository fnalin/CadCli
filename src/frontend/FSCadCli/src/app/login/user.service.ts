import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppSettingsService } from '../config/app-settings.service';
import {ILogin} from './login.model';

import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private _url: string;

  constructor(
    private http: Http,
    private _config: AppSettingsService,
  ) {
    this._url = this._config.urlBase("security/token/");
  }

  login(dados: ILogin) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(this._url, dados,
      { headers })
      .map(res => res.json())
      .map((res) => {
        if (res.authenticated) {
          localStorage.setItem('auth_token', res.token);
        }

        return res.authenticated;
      })
      .catch(this.handleError);
  }

  private handleError(response: Response) {
    if (response.status == 400) {
      return Observable.throw('Usuário não autenticado');
    }
    var data = JSON.parse((<any>response)._body).errors;
    return Observable.throw(data || 'Server error');
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('auth_token');
  }
}