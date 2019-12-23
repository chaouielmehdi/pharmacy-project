import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from 'app/services/medicine.service';
import { NotificationService } from 'app/services/notification.service';
import { Medicine } from 'app/classes/Medicine';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fade } from 'app/animations/fade';

@Component({
	selector: 'app-medicine-edit',
	templateUrl: './medicine-edit.component.html',
	styleUrls: ['./medicine-edit.component.css'],
	animations: [ fade ]
})
export class MedicineEditComponent implements OnInit {

	isPageLoading: boolean = true;

	constructor(
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private _medicineService: MedicineService,
		private _notificationService: NotificationService,
		private router: Router,
	) { }

	ngOnInit() {
		let id: string = this.activatedRoute.snapshot.paramMap.get('id');

		this.getMedicine(id);
	}


	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * medicine
	 * --------------------------------------------------------------------------
	 */

	medicine: Medicine = new Medicine();
	isMedicineExist: boolean = false;

	/**
	 * Gets and emit connected medicine to the subscribers of this.medicineEventEmitter
	 */
	getMedicine(id: string): void {
		this._medicineService.getMedicine(id).subscribe(
			(medicine) => {
				if(medicine != null) {
					this.medicine = medicine;
					this.isMedicineExist = true;

					this.initMedicineForm(this.medicine);
				}
				else {
					// medicine is not there
					this.medicine = new Medicine();
					this.isMedicineExist = false;
				}
			},
			(error) => {
				// medicine is not there
				this.medicine = new Medicine();
				this.isMedicineExist = false;
				// console.log("error : ", error);
			},
			() => {
				this.isPageLoading = false;
			});
	}



	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * medicine form
	 * --------------------------------------------------------------------------
	 */
	
	medicineForm: FormGroup;
	isMedicineFormLoading: boolean = false;
	isDeleteMedicineLoading: boolean = false;
	
	initMedicineForm(medicine: Medicine) {
		this.medicineForm = this.fb.group({
			id: new FormControl(

				// default value
				medicine.id,

				// validators
				[
					Validators.required
				]

			),
			name: new FormControl(

				// default value
				medicine.name,

				// validators
				[
					Validators.required
				]

			),
			expirationDate: new FormControl(

				// default value
				medicine.expirationDate,

				// validators
				[
					Validators.required
				]

			),
			unitPrice: new FormControl(

				// default value
				medicine.unitPrice,

				// validators
				[
					Validators.required
				]

			),
			idProvider: new FormControl(

				// default value
				medicine.idProvider,

				// validators
				[
					Validators.required
				]

			),
			quantity: new FormControl(

				// default value
				medicine.quantity,

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

			this._medicineService.update(this.medicineForm).subscribe(
				(medicine) => {
					if(medicine != null) {
						this._notificationService.success('Medicine updated!');
						this.router.navigateByUrl('medicines');
					}
					else {
						this._notificationService.danger('Cannot update medicine!');
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



	deleteMedicine(){
		// turn the button's loader on
		this.isDeleteMedicineLoading = true;

		this._medicineService.delete(this.medicine).subscribe(
			(medicine) => {
				this._notificationService.success('Medicine deleted!');
				this.router.navigateByUrl('medicines');
			},
			(error) => {
				this._notificationService.danger('Aïe! an error has occurred');
				// console.error(error);
			},
			() => {
				// turn the button's loader off
				this.isDeleteMedicineLoading = false;
			});
	}

}
