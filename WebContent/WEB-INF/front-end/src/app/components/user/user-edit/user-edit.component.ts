import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { NotificationService } from 'app/services/notification.service';
import { User } from 'app/classes/User';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fade } from 'app/animations/fade';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
	animations: [ fade ]
})
export class UserEditComponent implements OnInit {

	isPageLoading: boolean = true;

	constructor(
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private _userService: UserService,
		private _notificationService: NotificationService,
		private router: Router,
	) { }

	ngOnInit() {
		let id: string = this.activatedRoute.snapshot.paramMap.get('id');

		this.getUser(id);
	}


	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * user
	 * --------------------------------------------------------------------------
	 */

	user: User = new User();
	isUserExist: boolean = false;

	/**
	 * Gets and emit connected user to the subscribers of this.userEventEmitter
	 */
	getUser(id: string): void {
		this._userService.getUser(id).subscribe(
			(user) => {
				if(user != null) {
					this.user = user;
					this.isUserExist = true;

					this.initUserForm(this.user);
				}
				else {
					// user is not there
					this.user = new User();
					this.isUserExist = false;
				}
			},
			(error) => {
				// user is not there
				this.user = new User();
				this.isUserExist = false;
				// console.log("error : ", error);
			},
			() => {
				this.isPageLoading = false;
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
	isDeleteUserLoading: boolean = false;

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
						this._notificationService.success('User updated!');
						this.router.navigateByUrl('users');
					}
					else {
						this._notificationService.danger('Cannot update user!');
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



	deleteUser(){
		// turn the button's loader on
		this.isDeleteUserLoading = true;

		this._userService.delete(this.user).subscribe(
			(user) => {
				this._notificationService.success('User deleted!');
				this.router.navigateByUrl('users');
			},
			(error) => {
				this._notificationService.danger('Aïe! an error has occurred');
				// console.error(error);
			},
			() => {
				// turn the button's loader off
				this.isDeleteUserLoading = false;
			});
	}

}
