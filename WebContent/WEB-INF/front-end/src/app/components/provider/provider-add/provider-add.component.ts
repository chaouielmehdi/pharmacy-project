import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'app/services/provider.service';
import { NotificationService } from 'app/services/notification.service';
import { Provider } from 'app/classes/Provider';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fade } from 'app/animations/fade';
import { formatDate } from 'app/util/DateHandler';

@Component({
	selector: 'app-provider-add',
	templateUrl: './provider-add.component.html',
	styleUrls: ['./provider-add.component.css'],
	animations: [ fade ]
})
export class ProviderAddComponent implements OnInit {

	isPageLoading: boolean = true;

	constructor(
		private fb: FormBuilder,
		private _providerService: ProviderService,
		private _notificationService: NotificationService,
		private router: Router,
	) { }

	ngOnInit() {
		this.initProviderForm();
	}


	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * provider form
	 * --------------------------------------------------------------------------
	 */
	
	providerForm: FormGroup;
	isProviderFormLoading: boolean = false;

	initProviderForm() {
		this.providerForm = this.fb.group({
			name: new FormControl(
				// default value
				'',
	
				// validators
				[
					Validators.required
				]
			),
			city: new FormControl(
				// default value
				'',
				
				// validators
				[
					Validators.required
				]
			),
			contractDate: new FormControl(
				// default value
				formatDate('yyyy-mm-dd', new Date()),
	
				// validators
				[
					Validators.required
				]
			),
		});
	}

	submitProviderForm(): void {
		for (const i in this.providerForm.controls) {
			this.providerForm.controls[i].markAsDirty();
			this.providerForm.controls[i].updateValueAndValidity();
		}

		if(!this.providerForm.invalid) {
			// turn the button's loader on
			this.isProviderFormLoading = true;

			this._providerService.create(this.providerForm).subscribe(
				(provider) => {
					if(provider != null) {
						this._notificationService.success('Provider created!');
						this.router.navigateByUrl('providers');
					}
					else {
						this._notificationService.danger('You cannot create provider!');
					}
				},
				(error) => {
					this._notificationService.danger('Aïe! an error has occurred');
					// console.error(error);
				},
				() => {
					// turn the button's loader off
					this.isProviderFormLoading = false;
				});
		}
		else {
			this._notificationService.danger('Invalid form!');
		}
	}

}
