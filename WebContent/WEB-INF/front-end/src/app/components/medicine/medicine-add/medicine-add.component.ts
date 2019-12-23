import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'app/services/notification.service';
import { MedicineService } from 'app/services/medicine.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fade } from 'app/animations/fade';

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
		private _medicineService: MedicineService,
		private _notificationService: NotificationService,
		private router: Router,
	) { }

	ngOnInit() {
		this.initMedicineForm();
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
			medicinename: new FormControl(
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
						this._notificationService.danger('medicinename already exists!');
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

}
