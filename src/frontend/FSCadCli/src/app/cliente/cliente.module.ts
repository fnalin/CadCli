import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AjaxLoadingModule } from '../ajax-loading/ajax-loading.module';

import { ClienteService } from './cliente.service';
import { ClienteListComponent } from './cliente-list.component';
import { ClienteAddEditComponent } from './cliente-add-edit.component';


import { LoggedInGuard } from '../login/logged-in.guard';

@NgModule({
    imports: [
        SharedModule,
        AjaxLoadingModule,
        RouterModule.forChild([
            { path: 'clientes', component: ClienteListComponent, canActivate: [LoggedInGuard] },
            { path: 'clientes/adicionar', component: ClienteAddEditComponent, canActivate: [LoggedInGuard] },
            { path: 'clientes/:id', component: ClienteAddEditComponent, canActivate: [LoggedInGuard] },
        ])
    ],
    declarations: [
        ClienteListComponent, ClienteAddEditComponent
    ],
    providers: [
        ClienteService
        ]
})
export class ClienteModule { }