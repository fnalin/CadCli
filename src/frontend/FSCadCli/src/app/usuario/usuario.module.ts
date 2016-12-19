import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AjaxLoadingModule } from '../ajax-loading/ajax-loading.module';

import { UsuarioService } from './usuario.service';
import { UsuarioListComponent } from './usuario-list.component';

import { LoggedInGuard } from '../login/logged-in.guard';

@NgModule({
    imports: [
        SharedModule,
        AjaxLoadingModule,
        RouterModule.forChild([
            { path: 'usuarios', component: UsuarioListComponent, canActivate: [LoggedInGuard] }
        ])
    ],
    declarations: [
        UsuarioListComponent
    ],
    providers: [
        UsuarioService
        ]
})
export class UsuarioModule { }