import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AjaxLoadingModule } from '../ajax-loading/ajax-loading.module';

import { UsuarioService } from './usuario.service';
import { UsuarioListComponent } from './usuario-list.component';
import { UsuarioAddEditComponent } from './usuario-add-edit.component';

import { LoggedInGuard } from '../login/logged-in.guard';

@NgModule({
    imports: [
        SharedModule,
        AjaxLoadingModule,
        RouterModule.forChild([
            { path: 'usuarios', component: UsuarioListComponent, canActivate: [LoggedInGuard] },
            { path: 'usuarios/adicionar', component: UsuarioAddEditComponent, canActivate: [LoggedInGuard] },
            { path: 'usuarios/:id', component: UsuarioAddEditComponent, canActivate: [LoggedInGuard] },
        ])
    ],
    declarations: [
        UsuarioListComponent, UsuarioAddEditComponent
    ],
    providers: [
        UsuarioService
        ]
})
export class UsuarioModule { }