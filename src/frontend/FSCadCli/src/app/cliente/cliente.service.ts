import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';

import { ICliente } from './cliente';

@Injectable()
export class ClienteService {

    headers: Headers;
    private _url = 'http://localhost:60814/api/v1/clientes';

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    obterTodos(): Observable<ICliente[]> {
        return this._http.get(this._url)
            .map((response: Response) => <ICliente[]>response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(response: Response) {
        var data = JSON.parse((<any>response)._body).errors;
        return Observable.throw(data || 'Server error');
    }

}