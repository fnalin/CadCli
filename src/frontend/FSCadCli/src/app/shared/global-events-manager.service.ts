import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class GlobalEventsManagerService {
    public showNavBar: EventEmitter<any> = new EventEmitter();
    public hideNavBar: EventEmitter<any> = new EventEmitter();
}