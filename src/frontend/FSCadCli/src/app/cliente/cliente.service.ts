import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSettingsService } from '../config/app-settings.service';

import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';

import { ICliente } from './cliente';

@Injectable()
export class ClienteService {

    headers: Headers;
    private _url: string;

    constructor(
        private _http: Http,
        private _config: AppSettingsService,
        private router: Router) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        let authToken = localStorage.getItem('auth_token');
        this.headers.append('Authorization', `Bearer ${authToken}`);

        this._url = this._config.urlBase("clientes/");
    }

    obterTodos(): Observable<ICliente[]> {
        return this._http.get(this._url, { headers: this.headers })
            .map((response: Response) => <ICliente[]>response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    obter(id: number): Observable<ICliente> {
        return this._http.get(this._url + id, { headers: this.headers })
            .map((response: Response) => <ICliente>response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    salvar(cliente: ICliente): Observable<ICliente> {
        let verb;
        if (cliente.id == 0) {
            verb = this._http.post(this._url, cliente, { headers: this.headers });
        } else {
            verb = this._http.put(this._url + cliente.id, cliente, { headers: this.headers });
        }

        return verb
            .map((response: Response) => <ICliente[]>response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    excluir(id: Number): Observable<ICliente> {
        return this._http.delete(this._url + id, { headers: this.headers })
            .map((response: Response) => <ICliente[]>response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }


    private handleError = (error: Response) => {
        var data: any;
        switch (error.status) {
            case 401 || 403:
                localStorage.removeItem('auth_token');
                this.router.navigate(['login']);
                data = "Acesso não autorizado";
                break;
            case 404:
                data = "Recurso não localizado";
                break;
            default:
                data = JSON.parse((<any>error)._body).errors;
                break;
        }
        return Observable.throw(data || 'Server error');
    }


}