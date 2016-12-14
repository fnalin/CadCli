import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
      'http://localhost:60814/api/v1/security/token',
      JSON.stringify({ username, password }),
      { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.authenticated) {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
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
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}