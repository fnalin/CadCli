import { Component, OnInit } from '@angular/core';
import { GlobalEventsManagerService } from '../shared/global-events-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../login/user.service';

@Component({
    selector: 'menu-logado',
    templateUrl: './menu-logado.component.html'
})
export class MenuLogadoComponent implements OnInit {

    showNavBar: boolean = false;

    constructor(
        private globalEventsManager: GlobalEventsManagerService,
        private userService: UserService,
        private router: Router) {

        this.globalEventsManager.showNavBar.subscribe((mode: any) => {
            this.showNavBar = true;
        });

        this.globalEventsManager.hideNavBar.subscribe((mode: any) => {
            this.showNavBar =  false;
        });
    }

    ngOnInit(): void { }

    logout():void {
        this.showNavBar = false;        
        this.userService.logout();
        this.router.navigate(['/login']);
    }
}