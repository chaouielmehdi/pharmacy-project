import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'app/services/notification.service';
import { MedicineService } from 'app/services/medicine.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fade } from 'app/animations/fade';
import { Provider } from 'app/classes/Provider';
import { ProviderService } from 'app/services/provider.service';
import { formatDate } from 'app/util/DateHandler';

@Component({
	selector: 'app-medicine-add',
	templateUrl: './medicine-add.component.html',
	styleUrls: ['./medicine-add.component.css'],
	animations: [ fade ]
})
export class MedicineAddComponent implements OnInit {

	isPageLoading: boolean = true;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private _medicineService: MedicineService,
		private _notificationService: NotificationService,
		private _providerService: ProviderService,
	) { }

	ngOnInit() {
		this.initMedicineForm();

		this.getAllProviders();
	}


	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * medicine form
	 * --------------------------------------------------------------------------
	 */
	
	medicineForm: FormGroup;
	isMedicineFormLoading: boolean = false;

	initMedicineForm() {
		this.medicineForm = this.fb.group({
			name: new FormControl(
				// default value
				'',
	
				// validators
				[
					Validators.required
				]
			),
			expirationDate: new FormControl(
				// default value
				'',
	
				// validators
				[
					Validators.required
				]
			),
			unitPrice: new FormControl(
				// default value
				'',
	
				// validators
				[
					Validators.required,
					Validators.min(1)
				]
			),
			idProvider: new FormControl(
				// default value
				'',
	
				// validators
				[
					Validators.required
				]
			),
			quantity: new FormControl(
				// default value
				0,
	
				// validators
				[
					Validators.required
				]
			),
		});
	}

	submitMedicineForm(): void {
		for (const i in this.medicineForm.controls) {
			this.medicineForm.controls[i].markAsDirty();
			this.medicineForm.controls[i].updateValueAndValidity();
		}

		if(!this.medicineForm.invalid) {
			// turn the button's loader on
			this.isMedicineFormLoading = true;

			this._medicineService.create(this.medicineForm).subscribe(
				(medicine) => {
					if(medicine != null) {
						this._notificationService.success('Medicine created!');
						this.router.navigateByUrl('medicines');
					}
					else {
						this._notificationService.danger('Medicine already exists!');
					}
				},
				(error) => {
					this._notificationService.danger('Aïe! an error has occurred');
					// console.error(error);
				},
				() => {
					// turn the button's loader off
					this.isMedicineFormLoading = false;
				});
		}
		else {
			this._notificationService.danger('Invalid form!');
		}
	}



	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * providers
	 * --------------------------------------------------------------------------
	 */
	
	providers: Provider[] = [];
	
	getAllProviders(): void {
		this._providerService.getAll().subscribe(
			(providers) => {
				if(providers != null) {
					this.providers = providers;

					this.providers.forEach((provider) => {
						provider.contractDate = formatDate('Month dd, yyyy', provider.contractDate);
					});
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


}
