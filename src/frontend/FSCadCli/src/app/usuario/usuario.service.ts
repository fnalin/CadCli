import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSettingsService } from '../config/app-settings.service';
import { BaseService } from '../shared/base.service';
import { GlobalEventsManagerService } from '../shared/global-events-manager.service';


import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';

import { IUsuario } from './usuario';

@Injectable()
export class UsuarioService extends BaseService {

    headers: Headers;
    private _url: string;

    constructor(
        private _http: Http,
        private _config: AppSettingsService,
        protected globalEventsManager: GlobalEventsManagerService,
        protected router: Router) {

        super(router, globalEventsManager);

        this._url = this._config.urlBase("usuarios/");
    }

    obterTodos(): Observable<IUsuario[]> {
        this.montarHeader();
        return this._http.get(this._url, { headers: this.headers })
            .map((response: Response) => <IUsuario[]>response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    obter(id: Number): Observable<IUsuario> {
        this.montarHeader();
        return this._http.get(this._url + id, { headers: this.headers })
            .map((response: Response) => <IUsuario>response.json())
            .catch(this.handleError);
    }

    salvar(usuario: IUsuario): Observable<IUsuario> {
        this.montarHeader();
        let verb;
        if (usuario.id == 0) {
            verb = this._http.post(this._url, usuario, { headers: this.headers });
        } else {
            verb = this._http.put(this._url + usuario.id, usuario, { headers: this.headers });
        }

        return verb
            .map((response: Response) => <IUsuario[]>response.json())
            .catch(this.handleError);
    }

    excluir(id: Number): Observable<IUsuario> {
        this.montarHeader();
        return this._http.delete(this._url + id, { headers: this.headers })
            .map((response: Response) => <IUsuario[]>response.json())
            .catch(this.handleError);
    }

}