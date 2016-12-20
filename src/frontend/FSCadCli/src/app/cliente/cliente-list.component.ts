import { Component, OnInit } from '@angular/core';

import { ClienteService } from './cliente.service';
import { ICliente } from './cliente';
import { Sexo } from './cliente';

@Component({
    templateUrl: './cliente-list.component.html'
})
export class ClienteListComponent implements OnInit {
    pageTitle: string = 'Clientes';
    subTitle: string = 'Listagem de clientes';

    clientes: ICliente[];
    public sexo: Sexo;
    errorMessage: string;
    statusLoading: boolean = false;


    constructor(private _cliService: ClienteService) { }

    ngOnInit(): void {
        this.statusLoading = true;
        this.ObterDados();
    }

    ObterDados(): void {
        this._cliService.obterTodos()
            .subscribe(clientes => {
                this.clientes = clientes;
                this.statusLoading = false;
                console.log(Sexo[0]);
            }, error => {
                this.errorMessage = <any>error;
                console.log(this.errorMessage);
                this.statusLoading = false;
            });
    }

    CheckEnum(sexo:Sexo):any{
        return Sexo[sexo];
    }
}