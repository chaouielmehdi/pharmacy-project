import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  	providedIn: 'root'
})
export class BeforeLoginGuard implements CanActivate {
	path: ActivatedRouteSnapshot[];
	route: ActivatedRouteSnapshot;

	constructor(
		private router: Router,
		private _tokenService: TokenService
	) { }


	/**
	 * Determines whether can activate route or not
	 * @param route 
	 * @param state 
	 * @returns activate 
	 */
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
		boolean | Observable<boolean> | Promise<boolean>  {
	
		// yes you can
		if(!this._tokenService.isTokenValid()) {
			return true;
		}

		// no you can't
		this.router.navigateByUrl('/dashboard');
		return false;
	}

}
