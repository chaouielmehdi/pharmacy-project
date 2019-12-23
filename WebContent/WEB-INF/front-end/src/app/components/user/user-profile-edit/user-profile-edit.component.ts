import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { NotificationService } from 'app/services/notification.service';
import { User } from 'app/classes/User';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fade } from 'app/animations/fade';

@Component({
	selector: 'app-user-profile-edit',
	templateUrl: './user-profile-edit.component.html',
	styleUrls: ['./user-profile-edit.component.css'],
	animations: [ fade ]
})
export class UserProfileEditComponent implements OnInit {

	user: User = new User();
	isUserConnected: boolean = false;

	constructor(
		private fb: FormBuilder,
		private _userService: UserService,
		private _notificationService: NotificationService,
		private router: Router,
	) { }

	ngOnInit() {
		// init user form
		this.initUserForm(this.user);

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

			// init user form
			this.initUserForm(this.user);
		});

	}



	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * user form
	 * --------------------------------------------------------------------------
	 */
	
	userForm: FormGroup;
	isUserFormLoading: boolean = false;

	initUserForm(user: User) {
		this.userForm = this.fb.group({
			id: new FormControl(
				// default value
				user.id,

				// validators
				[
					Validators.required
				]
			),
			username: new FormControl(
				// default value
				user.username,
	
				// validators
				[
					Validators.required
				]
			),
			password: new FormControl(
				// default value
				user.password,
				
				// validators
				[
					Validators.required
				]
			),
			firstName: new FormControl(
				// default value
				user.firstName,
	
				// validators
				[
					Validators.required
				]
			),
			lastName: new FormControl(
				// default value
				user.lastName,
	
				// validators
				[
					Validators.required
				]
			),
			cin: new FormControl(
				// default value
				user.cin,
	
				// validators
				[
					Validators.required
				]
			),
			phone: new FormControl(
				// default value
				user.phone,
	
				// validators
				[
					Validators.required
				]
			),
			description: new FormControl(
				// default value
				user.description,
	
				// validators
				[
					Validators.required
				]
			),
		});
	}

	submitUserForm(): void {
		for (const i in this.userForm.controls) {
			this.userForm.controls[i].markAsDirty();
			this.userForm.controls[i].updateValueAndValidity();
		}

		if(!this.userForm.invalid) {
			// turn the button's loader on
			this.isUserFormLoading = true;

			this._userService.update(this.userForm).subscribe(
				(user) => {
					if(user != null) {
						this._notificationService.success('Profile updated!');
						this.router.navigateByUrl('profile');
					}
					else {
						this._notificationService.danger('Cannot update profile!');
					}
				},
				(error) => {
					this._notificationService.danger('Aïe! an error has occurred');
					// console.error(error);
				},
				() => {
					// turn the button's loader off
					this.isUserFormLoading = false;
				});
		}
		else {
			this._notificationService.danger('Invalid form!');
		}
	}
}
