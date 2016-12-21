import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ConfirmService, ConfirmState, ConfirmTemplateDirective, ConfirmModalComponent } from './confirm-modal-and-service';

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
        ConfirmService, ConfirmState
    ]
})
export class SharedModule { }
