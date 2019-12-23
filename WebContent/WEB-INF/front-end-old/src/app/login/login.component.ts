import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { NotificationService } from 'app/services/notification.service';
import { fade } from 'app/animations/fade';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	animations: [ fade ]
})
export class LoginComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private _userService: UserService,
		private _notificationService: NotificationService
	) { }

	ngOnInit() {
		// login form initialization
		this.initLoginForm();
	}








	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * login form
	 * --------------------------------------------------------------------------
	 */
	
	loginForm: FormGroup;
	isLoginFormLoading: boolean = false;

	initLoginForm() {
		this.loginForm = this.fb.group({
			username: new FormControl(
				// default value
				'mehdi',
	
				// validators
				[
					Validators.required
				]
			),
			password: new FormControl(
				// default value
				'mehdi',
	
				// validators
				[
					Validators.required
				]
			),
		});
	}

	submitLoginForm(): void {
		for (const i in this.loginForm.controls) {
			this.loginForm.controls[i].markAsDirty();
			this.loginForm.controls[i].updateValueAndValidity();
		}

		if(!this.loginForm.invalid) {
			// turn the button's loader on
			this.isLoginFormLoading = true;

			this._userService.login(this.loginForm).subscribe(
				(user) => {
					if(user != null) {
						this._userService.loginClient(user);

						this._notificationService.success('Welcome!');
					}
					else {
						this._notificationService.danger('username or password invalid');
						this.cleanLoginPwd();
					}
				},
				(error) => {
					this._notificationService.danger('Aïe! an error has occurred');
					// console.error(error);
				},
				() => {
					// turn the button's loader off
					this.isLoginFormLoading = false;
				});
		}
	}

	cleanLoginPwd() {
		this.loginForm.patchValue({
			password: 'mehdi'
		});
	}

}
