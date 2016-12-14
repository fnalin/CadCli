import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { GlobalEventsManagerService } from '../shared/global-events-manager.service';


@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(
        private user: UserService,
        private globalEventsManager: GlobalEventsManagerService,
        private router: Router) { }

    canActivate() {
        if (!this.user.isLoggedIn()) {
            this.router.navigate(['/login']);
            this.globalEventsManager.hideNavBar.emit(true);
            return false;
        }
        this.globalEventsManager.showNavBar.emit(true);
        return true;
    }
}