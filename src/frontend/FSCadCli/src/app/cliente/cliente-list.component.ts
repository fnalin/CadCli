import { Component, OnInit } from '@angular/core';

import { ClienteService } from './cliente.service';
import { ICliente } from './cliente';
@Component({
    templateUrl: './cliente-list.component.html'
})
export class ClienteListComponent implements OnInit {
    pageTitle: string = 'Clientes';
    subTitle: string = 'Listagem de clientes';

    clientes: ICliente[];
    errorMessage:string;
    times=['Coringão', 'Portuguesa', 'Santos'];

    constructor(private _cliService: ClienteService) { }

    ngOnInit(): void {
        this.ObterDados();
    }

    ObterDados():void{
        this._cliService.obterTodos()
            .subscribe(clientes=>{
                this.clientes = clientes;
                console.log(this.clientes);
            },error=>{
                 this.errorMessage = <any>error;
                console.log(this.errorMessage);
            });
    }
}