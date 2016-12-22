import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UsuarioService } from './usuario.service';
import { IUsuario } from './usuario';

@Component({
    templateUrl: './usuario-add-edit.component.html'
})
export class UsuarioAddEditComponent implements OnInit {
    pageTitle: string = 'Usuario';
    subTitle: string = 'Adicionar | Editar usuário';
    usuario: IUsuario = { id: 0, nome: '', email: '', senha: '', cadastro: new Date(), alteracao: new Date() };
    usuarioForm: FormGroup;
    errorMessage: string;
    statusLoading: boolean = false;


    constructor(
        private _usuarioService: UsuarioService,
        private toastr: ToastsManager,
        private _fb: FormBuilder,
        private _router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.usuarioForm = this._fb.group({
            nome: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
            email: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(100)])],
            cadastro: new FormControl({ value: '', disabled: true }),
            alteracao: new FormControl({ value: '', disabled: true })
        });

        this.route.params.subscribe(params => {

            let id = params['id'];

            if (id) {
                this.statusLoading = true;
                this._usuarioService.obter(id)
                    .subscribe(user => {
                        this.usuario = user;
                        this.statusLoading = false;
                    }, error => {
                        this.errorMessage = <any>error;
                        this.toastr.error(this.errorMessage, 'Erro');
                        this.statusLoading = false;
                    });
            }

        });
    }

    cadastrar(event) {
        event.preventDefault();
        this._usuarioService.salvar(this.usuario).subscribe(user => {
            this.usuario = user;
            this.statusLoading = false;
            this.toastr.success("Informações salvas!", 'Sucesso');
            this._router.navigate(['/usuarios']);
        }, error => {
            this.errorMessage = <any>error;
            this.toastr.error(this.errorMessage, 'Erro');
            this.statusLoading = false;
        });
    }
}