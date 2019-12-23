import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Medicine } from 'app/classes/Medicine';
import { environment } from 'environments/environment';
import { Transaction } from 'app/classes/Transaction';

@Injectable({
	providedIn: 'root'
})
export class MedicineService {

	constructor(
		private http: HttpClient,
		private router: Router,
		private _tokenService: TokenService
	) {
		// get the connected student
		this.getAndEmitConnectedMedicine();
	}






	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * General
	 * --------------------------------------------------------------------------
	 */

	// Holds the validation errors coming from the server
	errorResp: HttpErrorResponse = null;

	// Holds if the medicine is connected or not
	private isMedicineConnected = new BehaviorSubject<boolean>(this._tokenService.isTokenValid());
	authStatus$ = this.isMedicineConnected.asObservable();

	// medicine attrs
	medicine: Medicine = new Medicine();
	@Output() medicineEventEmitter: EventEmitter<Medicine> = new EventEmitter();









	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * CREATION
	 * --------------------------------------------------------------------------
	 */


	/**
	 * creates medicine
	 * @param form 
	 * @returns medicine$
	 */
	create(form: FormGroup): Observable<Medicine> {
		// console.log(`MedicineService => trying to create `, form.value);

		return this.http.post(environment.medicineCreateURL, form.value).pipe(
			tap((medicine: Medicine) => {
				// console.log(`MedicineService => medicine created = `, medicine)
			}),
			catchError((error) => {
				// console.log(`MedicineService => error = `, error);
				return of(null);
			})
		);

	}








	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * GET
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Gets and emit connected medicine to the subscribers of this.medicineEventEmitter
	 */
	getAndEmitConnectedMedicine(): void {
		this.getConnected().subscribe(
			(medicine) => {
				if(medicine != null) {
					this.medicine = medicine;
				}
				else {
					// medicine is not there
					this.medicine = new Medicine();
				}
			},
			(error) => {
				// medicine is not there
				this.medicine = new Medicine();
				
				// console.log("error : ", error);
			},
			() => {
				this.medicineEventEmitter.emit(this.medicine);
			});
	}


	/**
	 * Gets the connected medicine
	 * @returns medicine$
	 */
	getConnected(): Observable<Medicine> {
		// console.log(`MedicineService => trying to getConnected`);

		if(this._tokenService.isTokenValid()) {

			let id = this._tokenService.get();
			let url = environment.medicineGetURL + '?id=' + id;
			
			return this.http.get<Medicine>(url).pipe(
				tap((medicine: Medicine) => {
					// console.log(`MedicineService => got medicine = `, medicine)
				}),
				catchError((error) => {
					// console.log(`MedicineService => error = `, error);
					return of(null);
				})
			);
		}

		return of(null);
	}


	/**
	 * Gets a medicine by id
	 * @returns medicine$
	 */
	getMedicine(id: string): Observable<Medicine> {
		// console.log(`MedicineService => trying to getMedicine`);

		let url = environment.medicineGetURL + '?id=' + id;
		
		return this.http.get<Medicine>(url).pipe(
			tap((medicine: Medicine) => {
				// console.log(`MedicineService => got medicine = `, medicine)
			}),
			catchError((error) => {
				// console.log(`MedicineService => error = `, error);
				return of(null);
			})
		);
	}


	/**
	 * gets all medicines from server
	 * @returns table of medicine$
	 */
	getAll(): Observable<Medicine[]> {
		// console.log(`MedicineService => trying to getAll`);
		
		return this.http.get<Medicine[]>(environment.medicineGetAllURL).pipe(
			tap((medicines: Medicine[]) => {
				// console.log(`MedicineService => getAll = `, medicines)
			}),
			catchError((error) => {
				// console.log(`MedicineService => error = `, error);
				return of(null);
			})
		);
	}









	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * UPDATE
	 * --------------------------------------------------------------------------
	 */

	/**
	 * Updates medicine server side
	 * @param form 
	 * @returns  
	 */
	update(form: FormGroup): Observable<Medicine> {
		console.log(`MedicineService => trying to update `, form.value);

		return this.http.put(environment.medicineUpdateURL, form.value).pipe(
			tap((medicine: Medicine) => {
				// console.log(`MedicineService => updated medicine = `, medicine)
			}),
			catchError((error) => {
				// console.log(`MedicineService => error = `, error);
				return of(null);
			})
		);
	}









	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * DELETE
	 * --------------------------------------------------------------------------
	 */

	/**
	 * Deletes medicine
	 * @param medicine 
	 * @returns medicine$
	 */
	delete(medicine: Medicine | number): Observable<Medicine> {
		// console.log(`MedicineService => trying to delete : `, medicine);

		// append the id to the url
		const id = typeof medicine === 'number' ? medicine : medicine.id;
		const url = `${environment.medicineDeleteURL}?id=${id}`;

		return this.http.delete<Medicine>(url).pipe(
			tap((medicine: Medicine) => {
				// console.log(`MedicineService => deleted medicine = `, medicine)
			}),
			catchError((error) => {
				// console.log(`MedicineService => error = `, error);
				return of(null);
			})
		);
	}







	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * Buy & Sell medicine
	 * --------------------------------------------------------------------------
	 */

	/**
	 * buys medicine
	 * @param form 
	 * @returns transaction$
	 */
	buy(forms: FormGroup[]): Observable<Transaction[]> {
		let formsValue = forms.filter((form) => {return form != null})
			.map((form) => { return form.value});

		// console.log(`MedicineService => trying to buy `, formsValue);

		return this.http.post(environment.transactionBuyURL, formsValue).pipe(
			tap((transactions: Transaction[]) => {
				// console.log(`MedicineService => transaction made = `, transactions)
			}),
			catchError((error) => {
				// console.log(`MedicineService => error = `, error);
				return of(null);
			})
		);
	}
	
	sell(){
		
	}
}
