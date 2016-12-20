import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ClienteService } from './cliente.service';
import { ICliente } from './cliente';
import { Sexo } from './cliente';
@Component({
    templateUrl: './cliente-add-edit.component.html'
})
export class ClienteAddEditComponent implements OnInit {
    pageTitle: string = 'Clientes';
    subTitle: string = 'Adicionar/Editar clientes';
    cliente: ICliente = { id: 0, nome: '', sexo: null, cadastro: new Date(), alteracao: new Date() };
    clienteForm: FormGroup;
    errorMessage: string;
    statusLoading: boolean = false;


    constructor(
        private _cliService: ClienteService,
        private _fb: FormBuilder,
        private _router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.clienteForm = this._fb.group({
            nome: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
            sexo: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
            cadastro: new FormControl({value: '', disabled: true}),
            alteracao: new FormControl({value: '', disabled: true})
        });

        this.route.params.subscribe(params => {

            let id = params['id'];

            if (id) {
                this.statusLoading = true;
                this._cliService.obter(id)
                    .subscribe(cli => {
                        this.cliente = cli;
                        this.statusLoading = false;
                    }, error => {
                        this.errorMessage = <any>error;
                        console.log(this.errorMessage);
                        this.statusLoading = false;
                    });
            }

});
    }

    cadastrar(event) {
        this._cliService.salvar(this.cliente).subscribe(cli => {
            this.cliente = cli;
            this.statusLoading = false;
            this._router.navigate(['/clientes']);
        }, error => {
            this.errorMessage = <any>error;
            console.log(this.errorMessage);
            this.statusLoading = false;
        });
    }
}