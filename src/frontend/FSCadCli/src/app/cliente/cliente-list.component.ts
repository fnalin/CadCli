import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../shared/confirm-modal-and-service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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


    constructor(
        private _cliService: ClienteService,
        private confirmService: ConfirmService,
        private toastr: ToastsManager) { }

    ngOnInit(): void {
        this.statusLoading = true;
        this.ObterDados();
    }

    ObterDados(): void {
        this._cliService.obterTodos()
            .subscribe(clientes => {
                this.clientes = clientes;
                this.statusLoading = false;
            }, error => {
                this.errorMessage = <any>error;
                this.toastr.error(this.errorMessage, 'Erro');
                this.statusLoading = false;
            });
    }

    excluir(cliente: ICliente) {
        this.confirmService.confirm({
            title: 'Exclusão', message: 'Você tem certeza que deseja excluir o cliente ' +
            cliente.nome + '?'
        }).then(
            () => {
                this._cliService.excluir(cliente.id)
                    .subscribe(cli => {
                        //this.clientes = clientes;
                        this.clientes.splice(this.clientes.indexOf(cliente), 1);
                        this.toastr.success('Cliente  ' + cli.nome + ' excluído!', 'Sucesso!');
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

    CheckEnum(sexo: Sexo): any {
        return Sexo[sexo];
    }
}