import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { GlobalEventsManagerService } from './global-events-manager.service';

import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseService {
    headers: Headers;
    constructor(
        protected router: Router,
        protected globalEventsManager: GlobalEventsManagerService
    ) { }

    protected montarHeader() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        let authToken = localStorage.getItem('auth_token');
        this.headers.append('Authorization', 'Bearer ' + authToken);
    }

    protected handleError = (error: Response) => {
        var data: any;
        switch (error.status) {
            case 401 || 403:
                this.globalEventsManager.hideNavBar.emit(true);
                localStorage.removeItem('auth_token');
                this.router.navigate(['login']);
                data = "Token expirado";
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