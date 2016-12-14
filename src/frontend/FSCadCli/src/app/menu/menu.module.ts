import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MenuLogadoComponent } from './menu-logado.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule
        //  RouterModule.forChild([
        //     { path: 'menu', component: MenuLogadoComponent }
        // ])
    ],
    exports: [
        MenuLogadoComponent
        ],
    declarations: [
         MenuLogadoComponent
        ],
})
export class MenuModule { }
