import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ClienteService } from './cliente.service';
import { ClienteListComponent } from './cliente-list.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'clientes', component: ClienteListComponent }
        ])
    ],
    declarations: [
        ClienteListComponent
    ],
    providers: [
        ClienteService
        ]
})
export class ClienteModule { }