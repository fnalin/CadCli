import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AjaxLoadingModule } from '../ajax-loading/ajax-loading.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        SharedModule,
        AjaxLoadingModule,
        RouterModule.forChild([
            { path: 'login', component: LoginComponent }
        ])
    ],
    declarations: [LoginComponent],
    providers: []
})
export class LoginModule { }
