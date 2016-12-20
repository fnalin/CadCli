import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ClienteService } from './cliente.service';
import { ICliente } from './cliente';
import { Sexo } from './cliente';
@Component({
    templateUrl: './cliente-add-edit.component.html'
})
export class ClienteAddEditComponent implements OnInit {
    pageTitle: string = 'Clientes';
    subTitle: string = 'Adicionar/Editar clientes';
    cliente: ICliente = { id: 0, nome: '', sexo: Sexo.Masculino, cadastro: new Date(), alteracao: new Date() };
    clienteForm: FormGroup;
    errorMessage: string;
    statusLoading: boolean = false;


    constructor(private _cliService: ClienteService, private _fb: FormBuilder) { }

    ngOnInit(): void {
        this.clienteForm = this._fb.group({
            nome: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
            sexo: ['', Validators.compose([Validators.required])]
        });
    }

    cadastrar(event) {
        event.preventDefault();
        console.log(this.cliente);
    }
}