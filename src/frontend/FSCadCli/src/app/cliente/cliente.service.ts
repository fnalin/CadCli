import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSettingsService } from '../config/app-settings.service';
import { BaseService } from '../shared/base.service';
import { GlobalEventsManagerService } from '../shared/global-events-manager.service';

import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';

import { ICliente } from './cliente';

@Injectable()
export class ClienteService extends BaseService {

    private _url: string;

    constructor(
        private _http: Http,
        private _config: AppSettingsService,
        protected globalEventsManager: GlobalEventsManagerService,
        protected router: Router) {

        super(router, globalEventsManager);
        this._url = this._config.urlBase("clientes/");
    }

    obterTodos(): Observable<ICliente[]> {
        this.montarHeader();
        return this._http.get(this._url, { headers: this.headers })
            .map((response: Response) => <ICliente[]>response.json())
            .catch(this.handleError);
    }

    obter(id: number): Observable<ICliente> {
        this.montarHeader();
        return this._http.get(this._url + id, { headers: this.headers })
            .map((response: Response) => <ICliente>response.json())
            .catch(this.handleError);
    }

    salvar(cliente: ICliente): Observable<ICliente> {
        this.montarHeader();
        let verb;
        if (cliente.id == 0) {
            verb = this._http.post(this._url, cliente, { headers: this.headers });
        } else {
            verb = this._http.put(this._url + cliente.id, cliente, { headers: this.headers });
        }

        return verb
            .map((response: Response) => <ICliente[]>response.json())
            .catch(this.handleError);
    }

    excluir(id: Number): Observable<ICliente> {
        this.montarHeader();
        return this._http.delete(this._url + id, { headers: this.headers })
            .map((response: Response) => <ICliente[]>response.json())
            .catch(this.handleError);
    }
}