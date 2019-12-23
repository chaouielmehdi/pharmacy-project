import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { NotificationService } from 'app/services/notification.service';
import { User } from 'app/classes/User';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fade } from 'app/animations/fade';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css'],
	animations: [ fade ]
})
export class UserProfileComponent implements OnInit {

	user: User = new User();
	isUserConnected: boolean = false;


	constructor(
		private _userService: UserService,
	) { }

	ngOnInit() {
		// subscribe to the isUserConnected
		this._userService.authStatus$.subscribe(
			(status) => {
				this.isUserConnected = status;
			}
		);

		// getAndEmitConnectedUser
		this._userService.getAndEmitConnectedUser();
		
		// Subscription to userEventEmitter
		this._userService.userEventEmitter.subscribe((user) => {
			this.user = user;
		});

	}
}
