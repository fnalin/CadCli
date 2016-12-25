import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ConfirmService, ConfirmState, ConfirmTemplateDirective, ConfirmModalComponent } from './confirm-modal-and-service';
import { BaseService } from './base.service';
@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, ToastModule],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        ConfirmTemplateDirective, ConfirmModalComponent
    ],
    declarations: [
        ConfirmTemplateDirective, ConfirmModalComponent
    ],
    providers: [
        ConfirmService, ConfirmState, BaseService
    ]
})
export class SharedModule { }
