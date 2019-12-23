import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'app/services/provider.service';
import { NotificationService } from 'app/services/notification.service';
import { Provider } from 'app/classes/Provider';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fade } from 'app/animations/fade';
import { formatDate } from 'app/util/DateHandler';

@Component({
	selector: 'app-provider-edit',
	templateUrl: './provider-edit.component.html',
	styleUrls: ['./provider-edit.component.css'],
	animations: [ fade ]
})
export class ProviderEditComponent implements OnInit {

	isPageLoading: boolean = true;

	constructor(
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private _providerService: ProviderService,
		private _notificationService: NotificationService,
		private router: Router,
	) { }

	ngOnInit() {
		let id: string = this.activatedRoute.snapshot.paramMap.get('id');

		this.getProvider(id);
	}


	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * provider
	 * --------------------------------------------------------------------------
	 */

	provider: Provider = new Provider();
	isProviderExist: boolean = false;

	/**
	 * Gets and emit connected provider to the subscribers of this.providerEventEmitter
	 */
	getProvider(id: string): void {
		this._providerService.getProvider(id).subscribe(
			(provider) => {
				if(provider != null) {
					this.provider = provider;
					this.isProviderExist = true;

					this.initProviderForm(this.provider);
				}
				else {
					// provider is not there
					this.provider = new Provider();
					this.isProviderExist = false;
				}
			},
			(error) => {
				// provider is not there
				this.provider = new Provider();
				this.isProviderExist = false;
				// console.log("error : ", error);
			},
			() => {
				this.isPageLoading = false;
			});
	}



	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * provider form
	 * --------------------------------------------------------------------------
	 */
	
	providerForm: FormGroup;
	isProviderFormLoading: boolean = false;
	isDeleteProviderLoading: boolean = false;

	initProviderForm(provider: Provider) {
		this.providerForm = this.fb.group({
			id: new FormControl(
				// default value
				provider.id,

				// validators
				[
					Validators.required
				]
			),
			name: new FormControl(
				// default value
				provider.name,
				
				// validators
				[
					Validators.required
				]
			),
			city: new FormControl(
				// default value
				provider.city,
				
				// validators
				[
					Validators.required
				]
			),
			contractDate: new FormControl(
				// default value
				formatDate('yyyy-mm-dd', provider.contractDate),
				
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


			console.log(this.providerForm.value);
			

			this._providerService.update(this.providerForm).subscribe(
				(provider) => {
					if(provider != null) {
						this._notificationService.success('Provider updated!');
						this.router.navigateByUrl('providers');
					}
					else {
						this._notificationService.danger('Cannot update provider!');
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



	deleteProvider(){
		// turn the button's loader on
		this.isDeleteProviderLoading = true;

		this._providerService.delete(this.provider).subscribe(
			(provider) => {
				this._notificationService.success('Provider deleted!');
				this.router.navigateByUrl('providers');
			},
			(error) => {
				this._notificationService.danger('Aïe! an error has occurred');
				// console.error(error);
			},
			() => {
				// turn the button's loader off
				this.isDeleteProviderLoading = false;
			});
	}

}
