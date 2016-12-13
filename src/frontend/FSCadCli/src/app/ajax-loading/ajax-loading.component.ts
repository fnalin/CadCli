import { Component, Input } from '@angular/core';

@Component({
    selector: 'ajax-loading',
    templateUrl: './ajax-loading.component.html',
    styleUrls: ['./ajax-loading.component.css']
})
export class AjaxLoadingComponent {
    @Input() statusLoading: boolean = false;
}