import { Injectable } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})

export class TokenService {
	
	userTokenName: string = 'userToken';

	/**
	 * Creates an instance of token service.
	 */
	constructor() { }

	/**
	 * Handles token service
	 * @param token 
	 */
	handle(token: string): void{
		this.set(token);
	}

	/**
	 * Sets token in the local storage
	 * @param token 
	 */
	set(token: string) {
		localStorage.setItem(this.userTokenName, token);
	}

	/**
	 * Gets token service
	 * @returns token 
	 */
	get(): string{
		return localStorage.getItem(this.userTokenName);
	}

	/**
	 * Removes token from local storage
	 */
	remove(): void{
		localStorage.removeItem(this.userTokenName);
	}

	/**
	 * Determines whether token is valid or not
	 * @returns
	 */
	isTokenValid(): boolean{
		if(this.get()) {
			return true;
		}
		return false;
	}

}
