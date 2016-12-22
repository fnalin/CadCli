import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSettingsService } from '../config/app-settings.service';

import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';

import { IUsuario } from './usuario';

@Injectable()
export class UsuarioService {

    headers: Headers;
    private _url:string;

    constructor(
        private _http: Http,
        private _config: AppSettingsService,
        private router: Router) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        let authToken = localStorage.getItem('auth_token');
        this.headers.append('Authorization', `Bearer ${authToken}`);

        this._url = this._config.urlBase("usuarios/");
    }

    obterTodos(): Observable<IUsuario[]> {
        return this._http.get(this._url, { headers: this.headers })
            .map((response: Response) => <IUsuario[]>response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    obter(id: Number): Observable<IUsuario> {
        return this._http.get(this._url + id, { headers: this.headers })
            .map((response: Response) => <IUsuario>response.json())
            .catch(this.handleError);
    }

    salvar(usuario: IUsuario): Observable<IUsuario> {
        let verb;
        if (usuario.id == 0) {
            verb = this._http.post(this._url, usuario, { headers: this.headers });
        } else {
            verb = this._http.put(this._url + usuario.id, usuario, { headers: this.headers });
        }

        return verb
            .map((response: Response) => <IUsuario[]>response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    excluir(id: Number): Observable<IUsuario> {
        return this._http.delete(this._url + id, { headers: this.headers })
            .map((response: Response) => <IUsuario[]>response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError = (error: Response) => {
        var data: any;
        if (error.status == 401 || error.status == 403) {
            localStorage.removeItem('auth_token');
            this.router.navigate(['login']);
            data = "Acesso não autorizado";
        } else {
            data = JSON.parse((<any>error)._body).errors;
        }
        return Observable.throw(data || 'Server error');
    }


}