import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { User } from 'app/classes/User';
import { UserService } from 'app/services/user.service';
import { NotificationService } from 'app/services/notification.service';
import { Router } from '@angular/router';
import { fade } from 'app/animations/fade';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
	animations: [ fade ]
})
export class UsersComponent implements OnInit {

	isPageLoading: boolean = true;

	user: User = new User();
	isUserConnected: boolean = false;
	isAdmin: boolean = false;
	
	constructor(
		private _userService: UserService,
		private _notificationService: NotificationService,
		private router: Router
	) { }

	ngOnInit() {
		// subscribe to the isUserConnected
		this._userService.authStatus$.subscribe(
			(status) => {
				this.isUserConnected = status;
			}
		);
		
		// Subscription to userEventEmitter
		this._userService.userEventEmitter.subscribe((user) => {
			this.user = user;
			this.isAdmin = (this.user.type === 'admin');
		});

		// get all users
		this.getAllUsers();
	}






	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * users
	 * --------------------------------------------------------------------------
	 */

	users: User[] = [];
	
	getAllUsers(): void {
		this._userService.getAll().subscribe(
			(users) => {
				if(users != null) {
					this.users = users;
				}
			},
			(error) => {
				this._notificationService.danger('Aïe! an error has occurred');
				// console.error(error);
			},
			() => {
				this.isPageLoading = false;
			});
	}

	edit(id: number){
		this.router.navigateByUrl('user/edit/' + id);
	}

}
