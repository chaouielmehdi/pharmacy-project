import { Component, OnInit } from '@angular/core';
import { Medicine } from 'app/classes/Medicine';
import { MedicineService } from 'app/services/medicine.service';
import { NotificationService } from 'app/services/notification.service';
import { fade } from 'app/animations/fade';
import { msToDays } from 'app/pipes/nearExpirationDate';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { TokenService } from 'app/services/token.service';
import { generateInvoice } from 'app/util/PDF/GenerateInvoice';
import { User } from 'app/classes/User';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';
import { formatDate } from 'app/util/DateHandler';

@Component({
	selector: 'app-medicines',
	templateUrl: './medicines.component.html',
	styleUrls: ['./medicines.component.css'],
	animations: [ fade ]
})
export class MedicinesComponent implements OnInit {

	isPageLoading: boolean = true;
	user: User = new User();

	constructor(
		private _medicineService: MedicineService,
		private _notificationService: NotificationService,
		private _tokenService: TokenService,
		private _userService: UserService,
		private fb: FormBuilder,
		private router: Router,
	) { }

	ngOnInit() {
		// get all medicines
		this.getAllMedicines();

		this.reinitialize();

		this.getConnectedUser();
	}

	getConnectedUser(){
		// get and emit the connected user
		this._userService.getAndEmitConnectedUser();

		// Subscription to userEventEmitter
		this._userService.userEventEmitter.subscribe((user) => {
			this.user = user;
		});
	}
	





	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * medicines
	 * --------------------------------------------------------------------------
	 */

	medicines: Medicine[] = [];
	filteredMedicines: Medicine[] = [];
	searchInputValue: string = '';
	isStatusChecked: boolean[] = [false, false, false];
	isBuying: boolean = false;
	isSelling: boolean = false;
	isDisabledBuying: boolean = true;
	isDisabledSelling: boolean = true;
	isMakeABuyDisabled: boolean = false;
	isMakeASellDisabled: boolean = false;
	selectedMedicines: {medicine: Medicine, isSelected: boolean}[] = [];
	quantities: number[] = [];
	totals: number[] = [];
	totalPrice: number = 0;

	isBuyLoading: boolean = false;
	isSellLoading: boolean = false;

	getAllMedicines(): void {
		this._medicineService.getAll().subscribe(
			(medicines) => {
				if(medicines != null) {

					// set expirationDate
					medicines.forEach((medicine) => {
						medicine.expirationDate = formatDate('Month dd, yyyy', medicine.expirationDate);
					});

					// fill all the medicines lists
					this.medicines = medicines;
					this.filteredMedicines = medicines;
					this.selectedMedicines = medicines.map((medicine) =>{
						return {medicine: medicine, isSelected: false};
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

	filterByName() {
		this.filteredMedicines = this.medicines.filter((medicine) => {
			return medicine.name.toLowerCase().indexOf(this.searchInputValue.toLowerCase()) >= 0;
		});
	}

	filterByStatus(){

		this.filteredMedicines = this.medicines;

		// Quantity < 10 items
		if(this.isStatusChecked[0]){
			this.filteredMedicines = this.filteredMedicines.filter((medicine) => {
				return medicine.quantity < 10;
			});
		}
		
		// Exp. Date < 30 days
		if(this.isStatusChecked[1]){
			this.filteredMedicines = this.filteredMedicines.filter((medicine) => {
				let diffDays = msToDays((new Date(medicine.expirationDate).getTime() - new Date().getTime()));
				return diffDays < 30;
			});
		}
		
		// Good
		if(this.isStatusChecked[2]){
			// make others unchecked
			this.isStatusChecked[0] = false;
			this.isStatusChecked[1] = false;
			
			this.filteredMedicines = this.medicines.filter((medicine) => {
				let diffDays = msToDays((new Date(medicine.expirationDate).getTime() - new Date().getTime()));
				return !(diffDays < 30 || medicine.quantity < 10);
			});
		}
	}

	selectMedicine(event, id: number){

		this.isDisabledBuying = true;
		this.isDisabledSelling = true;

		// add id to selectedMedicines
		this.selectedMedicines.forEach((selectedMedicine) => {
			if(selectedMedicine.medicine.id == id) {
				selectedMedicine.isSelected = event.srcElement.checked;
			}

			if(selectedMedicine.isSelected) {
				this.isDisabledBuying = false;
				this.isDisabledSelling = false;
			}
		});
	}

	quantityChanged(i, quantityAvailable){

		// fill Total Price
		this.fillTotalPrice();

		// validate quantities <= 0
		this.isMakeABuyDisabled = false;
		this.isMakeASellDisabled = false;

		this.quantities.forEach((quantity, index) => {
			if(this.selectedMedicines[index].isSelected && quantity <= 0){
				this.isMakeABuyDisabled = true;
				this.isMakeASellDisabled = true;
			}

			// in case selling
			if(this.isSelling && this.quantities[i] > quantityAvailable){
				this.isMakeASellDisabled = true;
			}
		});
	}

	buy(){
		// show isBuying
		this.isBuying = true;
		this.isSelling = false;

		// fill Quantities
		this.fillQuantities();

		// fill Total Price
		this.fillTotalPrice();
		
		this.selectedMedicines.forEach((element, i) => {
			this.quantityChanged(i, element.medicine.quantity)
		});
	}

	sell(){
		// show isSelling
		this.isBuying = false;
		this.isSelling = true;
		
		// fill Quantities
		this.fillQuantities();

		// fill Total Price
		this.fillTotalPrice();

		this.selectedMedicines.forEach((element, i) => {
			this.quantityChanged(i, element.medicine.quantity)
		});
	}

	fillTotalPrice(){
		// fill totals
		this.selectedMedicines.forEach((element, i) => {
			if(element.isSelected){
				this.totals[i] = element.medicine.unitPrice * this.quantities[i];
			}
			else{
				this.totals[i] = 0;
			}
		});
		
		// fill total price
		this.totalPrice = 0;
		
		this.totals.forEach((t) => {
			this.totalPrice += t;
		});
	}

	fillQuantities(){
		this.selectedMedicines.forEach((element, i) => {
			if(element.isSelected){
				this.quantities[i] = 1;
			}
			else{
				this.quantities[i] = 0;
			}
		});
	}

	reinitialize(){
		this.isBuying = false;
		this.isSelling = false;

		this.isDisabledBuying = true;
		this.isDisabledSelling = true;

		this.selectedMedicines.forEach((element) => {
			element.isSelected = false;
		});

		this.searchInputValue = '';
	}

	makeABuy(){
		// forms to be sent
		let transactionForms: FormGroup[] = [];

		// fill forms
		this.selectedMedicines.forEach((selectedMedicine, index) => {
			
			if(selectedMedicine.isSelected){
				let transactionForm: FormGroup = this.fb.group({
					type: new FormControl(
						// default value
						'buy',
			
						// validators
						[
							Validators.required
						]
					),
					date: new FormControl(
						// default value
						new Date(),
			
						// validators
						[
							Validators.required
						]
					),
					idMedicine: new FormControl(
						// default value
						selectedMedicine.medicine.id,
			
						// validators
						[
							Validators.required
						]
					),
					idProvider: new FormControl(
						// default value
						selectedMedicine.medicine.idProvider,
			
						// validators
						[
							Validators.required
						]
					),
					idUser: new FormControl(
						// default value
						this._tokenService.get(),
						
						// validators
						[
							Validators.required
						]
					),
					quantity: new FormControl(
						// default value
						this.quantities[index],
						
						// validators
						[
							Validators.required
						]
					),
				});

				// fill the forms table
				transactionForms[index] = transactionForm;
			}
		});

		// turn the button's loader on
		this.isBuyLoading = true;

		// send forms to backend
		this._medicineService.makeTransaction(transactionForms).subscribe(
			(transactions) => {
				if(transactions != null) {
					this._notificationService.success('The store has been updated!');

					// prepare for generate invoice
					let medicines: Medicine[] = [];

					// fill medicines
					let i = 0;
					this.selectedMedicines.forEach((selectedMedicine, index) => {

						// get medicines to generate invoice
						if(selectedMedicine.isSelected){
							medicines[index] = new Medicine(
								selectedMedicine.medicine.id,
								selectedMedicine.medicine.name,
								selectedMedicine.medicine.expirationDate,
								selectedMedicine.medicine.unitPrice,
								selectedMedicine.medicine.idProvider,
								transactions[i].quantity,
							);

							// update selectedMedicine
							selectedMedicine.medicine.quantity += transactions[i++].quantity;
						}
					});

					// generateInvoice
					generateInvoice(medicines, this.totalPrice, this.user, 'Purchase invoice');

					// reinitialize
					this.reinitialize();
				}
				else {
					this._notificationService.danger('Aïe! an error has occurred');
				}
			},
			(error) => {
				this._notificationService.danger('Aïe! an error has occurred');
				// console.error(error);
			},
			() => {
				// turn the button's loader off
				this.isBuyLoading = false;
			});

	}




	makeASell(){
		// forms to be sent
		let transactionForms: FormGroup[] = [];

		// fill forms
		this.selectedMedicines.forEach((selectedMedicine, index) => {
			
			if(selectedMedicine.isSelected){
				let transactionForm: FormGroup = this.fb.group({
					type: new FormControl(
						// default value
						'sell',
			
						// validators
						[
							Validators.required
						]
					),
					date: new FormControl(
						// default value
						new Date(),
			
						// validators
						[
							Validators.required
						]
					),
					idMedicine: new FormControl(
						// default value
						selectedMedicine.medicine.id,
			
						// validators
						[
							Validators.required
						]
					),
					idProvider: new FormControl(
						// default value
						selectedMedicine.medicine.idProvider,
			
						// validators
						[
							Validators.required
						]
					),
					idUser: new FormControl(
						// default value
						this._tokenService.get(),
						
						// validators
						[
							Validators.required
						]
					),
					quantity: new FormControl(
						// default value
						this.quantities[index],
						
						// validators
						[
							Validators.required
						]
					),
				});

				// fill the forms table
				transactionForms[index] = transactionForm;
			}
		});

		// turn the button's loader on
		this.isSellLoading = true;

		// send forms to backend
		this._medicineService.makeTransaction(transactionForms).subscribe(
			(transactions) => {
				if(transactions != null) {
					this._notificationService.success('The store has been updated!');

					// prepare for generate invoice
					let medicines: Medicine[] = [];

					// fill medicines
					let i = 0;
					this.selectedMedicines.forEach((selectedMedicine, index) => {

						// get medicines to generate invoice
						if(selectedMedicine.isSelected){
							medicines[index] = new Medicine(
								selectedMedicine.medicine.id,
								selectedMedicine.medicine.name,
								selectedMedicine.medicine.expirationDate,
								selectedMedicine.medicine.unitPrice,
								selectedMedicine.medicine.idProvider,
								transactions[i].quantity,
							);

							// update selectedMedicine
							selectedMedicine.medicine.quantity -= transactions[i++].quantity;
						}
					});

					// generateInvoice
					generateInvoice(medicines, this.totalPrice, this.user, 'Sales invoice');

					// reinitialize
					this.reinitialize();
				}
				else {
					this._notificationService.danger('Aïe! an error has occurred');
				}
			},
			(error) => {
				this._notificationService.danger('Aïe! an error has occurred');
				// console.error(error);
			},
			() => {
				// turn the button's loader off
				this.isSellLoading = false;
			});
	}


	
	edit(id: number){
		this.router.navigateByUrl('medicine/edit/' + id);
	}
}
