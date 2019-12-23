import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { NotificationService } from 'app/services/notification.service';
import { User } from 'app/classes/User';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fade } from 'app/animations/fade';

@Component({
	selector: 'app-user-add',
	templateUrl: './user-add.component.html',
	styleUrls: ['./user-add.component.css'],
	animations: [ fade ]
})
export class UserAddComponent implements OnInit {

	isPageLoading: boolean = true;

	constructor(
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private _userService: UserService,
		private _notificationService: NotificationService,
		private router: Router,
	) { }

	ngOnInit() {
		this.initUserForm();
	}


	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * user form
	 * --------------------------------------------------------------------------
	 */
	
	userForm: FormGroup;
	isUserFormLoading: boolean = false;

	initUserForm() {
		this.userForm = this.fb.group({
			username: new FormControl(
				// default value
				'',
	
				// validators
				[
					Validators.required
				]
			),
			password: new FormControl(
				// default value
				'',
				
				// validators
				[
					Validators.required
				]
			),
			firstName: new FormControl(
				// default value
				'',
	
				// validators
				[
					Validators.required
				]
			),
			lastName: new FormControl(
				// default value
				'',
	
				// validators
				[
					Validators.required
				]
			),
			cin: new FormControl(
				// default value
				'',
	
				// validators
				[
					Validators.required
				]
			),
			phone: new FormControl(
				// default value
				'',
	
				// validators
				[
					Validators.required
				]
			),
			description: new FormControl(
				// default value
				'',
	
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

			this._userService.create(this.userForm).subscribe(
				(user) => {
					if(user != null) {
						this._notificationService.success('User created!');
						this.router.navigateByUrl('users');
					}
					else {
						this._notificationService.danger('username already exists!');
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
