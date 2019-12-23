import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Provider } from 'app/classes/Provider';
import { environment } from 'environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProviderService {

	constructor(
		private http: HttpClient
	) {
	}






	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * General
	 * --------------------------------------------------------------------------
	 */

	// Holds the validation errors coming from the server
	errorResp: HttpErrorResponse = null;

	





	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * CREATION
	 * --------------------------------------------------------------------------
	 */


	/**
	 * creates provider
	 * @param form 
	 * @returns provider$
	 */
	create(form: FormGroup): Observable<Provider> {
		// console.log(`ProviderService => trying to create `, form.value);

		return this.http.post(environment.providerCreateURL, form.value).pipe(
			tap((provider: Provider) => {
				// console.log(`ProviderService => provider created = `, provider)
			}),
			catchError((error) => {
				// console.log(`ProviderService => error = `, error);
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
	 * Gets a provider by id
	 * @returns provider$
	 */
	getProvider(id: string): Observable<Provider> {
		// console.log(`ProviderService => trying to getProvider`);

		let url = environment.providerGetURL + '?id=' + id;
		
		return this.http.get<Provider>(url).pipe(
			tap((provider: Provider) => {
				// console.log(`ProviderService => got provider = `, provider)
			}),
			catchError((error) => {
				// console.log(`ProviderService => error = `, error);
				return of(null);
			})
		);
	}


	/**
	 * gets all providers from server
	 * @returns table of provider$
	 */
	getAll(): Observable<Provider[]> {
		// console.log(`ProviderService => trying to getAll`);
		
		return this.http.get<Provider[]>(environment.providerGetAllURL).pipe(
			tap((providers: Provider[]) => {
				// console.log(`ProviderService => getAll = `, providers)
			}),
			catchError((error) => {
				// console.log(`ProviderService => error = `, error);
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
	 * Updates provider server side
	 * @param form 
	 * @returns  
	 */
	update(form: FormGroup): Observable<Provider> {
		// console.log(`ProviderService => trying to update `, form.value);

		return this.http.put(environment.providerUpdateURL, form.value).pipe(
			tap((provider: Provider) => {
				// console.log(`ProviderService => updated provider = `, provider)
			}),
			catchError((error) => {
				// console.log(`ProviderService => error = `, error);
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
	 * Deletes provider
	 * @param provider 
	 * @returns provider$
	 */
	delete(provider: Provider | number): Observable<Provider> {
		// console.log(`ProviderService => trying to delete : `, provider);

		// append the id to the url
		const id = typeof provider === 'number' ? provider : provider.id;
		const url = `${environment.providerDeleteURL}?id=${id}`;

		return this.http.delete<Provider>(url).pipe(
			tap((provider: Provider) => {
				// console.log(`ProviderService => deleted provider = `, provider)
			}),
			catchError((error) => {
				// console.log(`ProviderService => error = `, error);
				return of(null);
			})
		);
	}

}
