import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { User } from 'app/classes/User';
import { environment } from 'environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(
		private http: HttpClient,
		private router: Router,
		private _tokenService: TokenService
	) {
		// get the connected user
		this.getAndEmitConnectedUser();
	}






	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * General
	 * --------------------------------------------------------------------------
	 */

	// Holds the validation errors coming from the server
	errorResp: HttpErrorResponse = null;

	// Holds if the user is connected or not
	private isUserConnected = new BehaviorSubject<boolean>(this._tokenService.isTokenValid());
	authStatus$ = this.isUserConnected.asObservable();

	// user attrs
	user: User = new User();
	@Output() userEventEmitter: EventEmitter<User> = new EventEmitter();









	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * LOGIN - LOGOUT
	 * --------------------------------------------------------------------------
	 */

	/**
	 * Logins the server side
	 * @param form 
	 * @returns user$
	 */
	login(form: FormGroup): Observable<User> {
		// console.log(`UserService => trying to login : `, form.value);

		return this.http.post(environment.userLoginURL, form.value).pipe(
			tap((user: User) => {
				// console.log(`UserService => logged in user = `, user)
			}),
			catchError((error) => {
				// console.log(`UserService => error = `, error);
				return of(null);
			})
		);
	}


	/**
	 * Logins client side
	 * @param user 
	 */
	loginClient(user: User): void {

		this.router.navigateByUrl('/dashboard');
		
		this._tokenService.handle(user.id);
		
		this.changeAuthStatus$(true);

		// get the connected user
		this.getAndEmitConnectedUser();
	}


	/**
	 * Changes auth status
	 * @param value 
	 */
	changeAuthStatus$(value) {
		this.isUserConnected.next(value);
	}


	/**
	 * Logs out in server side
	 * @returns user$
	 */
	logout(): Observable<null> {
		// console.log(`UserService => trying to logout`);
		
		return this.http.get(environment.userLogoutURL).pipe(
			tap((user: User) => {
				// console.log(`UserService => logout = `, user)
			}),
			catchError((error) => {
				// console.log(`UserService => error = `, error);
				return of(null);
			})
		);
	}


	/**
	 * Logouts client side
	 */
	logoutClient() {
		this._tokenService.remove();

		this.changeAuthStatus$(false);
		
		this.router.navigateByUrl('/login');
	}




	





	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * CREATION
	 * --------------------------------------------------------------------------
	 */


	/**
	 * creates user
	 * @param form 
	 * @returns user$
	 */
	create(form: FormGroup): Observable<User> {
		// console.log(`UserService => trying to create `, form.value);

		return this.http.post(environment.userCreateURL, form.value).pipe(
			tap((user: User) => {
				// console.log(`UserService => user created = `, user)
			}),
			catchError((error) => {
				// console.log(`UserService => error = `, error);
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
	 * Gets and emit connected user to the subscribers of this.userEventEmitter
	 */
	getAndEmitConnectedUser(): void {
		this.getConnected().subscribe(
			(user) => {
				if(user != null) {
					this.user = user;
				}
				else {
					// user is not there
					this.user = new User();
				}
			},
			(error) => {
				// user is not there
				this.user = new User();
				
				// console.log("error : ", error);
			},
			() => {
				this.userEventEmitter.emit(this.user);
			});
	}


	/**
	 * Gets the connected user
	 * @returns user$
	 */
	getConnected(): Observable<User> {
		// console.log(`UserService => trying to getConnected`);

		if(this._tokenService.isTokenValid()) {

			let id = this._tokenService.get();
			let url = environment.userGetURL + '?id=' + id;
			
			return this.http.get<User>(url).pipe(
				tap((user: User) => {
					// console.log(`UserService => got user = `, user)
				}),
				catchError((error) => {
					// console.log(`UserService => error = `, error);
					return of(null);
				})
			);
		}

		return of(null);
	}


	/**
	 * Gets a user by id
	 * @returns user$
	 */
	getUser(id: string): Observable<User> {
		// console.log(`UserService => trying to getUser`);

		let url = environment.userGetURL + '?id=' + id;
		
		return this.http.get<User>(url).pipe(
			tap((user: User) => {
				// console.log(`UserService => got user = `, user)
			}),
			catchError((error) => {
				// console.log(`UserService => error = `, error);
				return of(null);
			})
		);
	}


	/**
	 * gets all users from server
	 * @returns table of user$
	 */
	getAll(): Observable<User[]> {
		// console.log(`UserService => trying to getAll`);
		
		return this.http.get<User[]>(environment.userGetAllURL).pipe(
			tap((users: User[]) => {
				// console.log(`UserService => getAll = `, users)
			}),
			catchError((error) => {
				// console.log(`UserService => error = `, error);
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
	 * Updates user server side
	 * @param form 
	 * @returns  
	 */
	update(form: FormGroup): Observable<User> {
		console.log(`UserService => trying to update `, form.value);

		return this.http.put(environment.userUpdateURL, form.value).pipe(
			tap((user: User) => {
				// console.log(`UserService => updated user = `, user)
			}),
			catchError((error) => {
				// console.log(`UserService => error = `, error);
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
	 * Deletes user
	 * @param user 
	 * @returns user$
	 */
	delete(user: User | number): Observable<User> {
		// console.log(`UserService => trying to delete : `, user);

		// append the id to the url
		const id = typeof user === 'number' ? user : user.id;
		const url = `${environment.userDeleteURL}?id=${id}`;

		return this.http.delete<User>(url).pipe(
			tap((user: User) => {
				// console.log(`UserService => deleted user = `, user)
			}),
			catchError((error) => {
				// console.log(`UserService => error = `, error);
				return of(null);
			})
		);
	}

}
