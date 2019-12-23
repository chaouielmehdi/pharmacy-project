import { Component, OnInit } from '@angular/core';
import { User } from 'app/classes/User';
import { UserService } from 'app/services/user.service';
import { TokenService } from 'app/services/token.service';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    isVisible: boolean;
    icon: string;
    class: string;
}

export let ROUTES: RouteInfo[] = [];

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	menuItems: any[];

	user: User = new User();
	isUserConnected: boolean = false;
	
	constructor(
		private _userService: UserService
	) { }

	ngOnInit() {
		// subscribe to the isUserConnected
		this._userService.authStatus$.subscribe(
			(status) => {
				this.isUserConnected = status;

				ROUTES = [
					{ path: '/dashboard',		title: 'Dashboard',		isVisible: this.isUserConnected,	icon: 'dashboard',		class: '' },
					{ path: '/users',			title: 'Employees',		isVisible: this.isUserConnected,	icon: 'people_alt',		class: '' },
					{ path: '/login',			title: 'Login',			isVisible: !this.isUserConnected,	icon: 'person',			class: '' },
				];
				
				this.menuItems = ROUTES.filter(menuItem => menuItem);
			}
		);
	}

	
	isMobileMenu() {
		if ($(window).width() > 991) {
			return false;
		}
		return true;
	};
}
