import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';

import { ICliente } from './cliente';

@Injectable()
export class ClienteService {

    headers: Headers;
    private _url = 'http://localhost:60814/api/v1/clientes';

    constructor(
        private _http: Http,
        private router: Router) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        let authToken = localStorage.getItem('auth_token');
        this.headers.append('Authorization', `Bearer ${authToken}`);
    }

    obterTodos(): Observable<ICliente[]> {
        return this._http.get(this._url, { headers: this.headers })
            .map((response: Response) => <ICliente[]>response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(response: Response) {
        if (response.status == 401 || response.status == 403) {
            this.router.navigate(['/login']);
            return;
        }
        var data = JSON.parse((<any>response)._body).errors;
        return Observable.throw(data || 'Server error');
    }
}