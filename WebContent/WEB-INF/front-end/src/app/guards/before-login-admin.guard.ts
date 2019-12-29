import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminTokenService } from '../services/AdminToken.service';

@Injectable({
  	providedIn: 'root'
})
export class BeforeLoginAdminGuard implements CanActivate {
	path: ActivatedRouteSnapshot[];
	route: ActivatedRouteSnapshot;

	constructor(
		private router: Router,
		private _AdminTokenService: AdminTokenService
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
		if(!this._AdminTokenService.isTokenValid()) {
			return true;
		}

		// no you can't
		this.router.navigateByUrl('/dashboard');
		return false;
	}

}
