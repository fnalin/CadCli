import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { AjaxLoadingComponent } from '../ajax-loading/ajax-loading.component';


@NgModule({
    imports: [SharedModule],
    exports:[AjaxLoadingComponent],
    declarations: [
         AjaxLoadingComponent
    ],
    providers: []
})
export class AjaxLoadingModule { }