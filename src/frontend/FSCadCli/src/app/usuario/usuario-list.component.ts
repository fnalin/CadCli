import { Component, OnInit } from '@angular/core';

import { UsuarioService } from './usuario.service';
import { IUsuario } from './usuario';

@Component({
    templateUrl: './usuario-list.component.html'
})
export class UsuarioListComponent implements OnInit {
    pageTitle: string = 'Usuários';
    subTitle: string = 'Listagem de usuários';

    usuarios: IUsuario[];
    errorMessage: string;
    statusLoading: boolean = false;


    constructor(private _usuarioService: UsuarioService) { }

    ngOnInit(): void {
        this.statusLoading = true;
        this.ObterDados();
    }

    ObterDados(): void {
        this._usuarioService.obterTodos()
            .subscribe(usuarios => {
                this.usuarios = usuarios;
                this.statusLoading = false;
            }, error => {
                this.errorMessage = <any>error;
                console.log(this.errorMessage);
                this.statusLoading = false;
            });
    }
}