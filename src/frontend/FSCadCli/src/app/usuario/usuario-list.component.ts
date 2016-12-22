import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ConfirmService } from '../shared/confirm-modal-and-service';
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


    constructor(
        private _usuarioService: UsuarioService,
        private confirmService: ConfirmService,
        private toastr: ToastsManager) { }

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
                this.toastr.error(this.errorMessage, 'Erro');
                this.statusLoading = false;
            });
    }

    excluir(usuario: IUsuario) {
        this.confirmService.confirm({
            title: 'Exclusão', message: 'Você tem certeza que deseja excluir o usuário ' +
            usuario.nome + '?'
        }).then(
            () => {
                this._usuarioService.excluir(usuario.id)
                    .subscribe(user => {
                        this.usuarios.splice(this.usuarios.indexOf(user), 1);
                        this.toastr.success('Usuário  ' + user.nome + ' excluído!', 'Sucesso!');
                        this.statusLoading = false;
                    }, error => {
                        this.errorMessage = <any>error;
                        this.toastr.error(this.errorMessage, 'Erro');
                        this.statusLoading = false;
                    });

            },
            () => {
                //console.log('not deleting...');
            });
    }

}