import { HttpHeaders } from '@angular/common/http';

/*
 * (non-doc)
 * --------------------------------------------------------------------------
 * Base URLs
 * --------------------------------------------------------------------------
 * Used only in this file
 */

// Client Base URL
export const baseClientURL = 					'http://localhost:4200';

// API Base URL
export const baseApiURL = 						'http://localhost:8080/project-pharmacy';

// User Base URL
export const userBaseURL =						baseApiURL+'/users';







/*
 * (non-doc)
 * --------------------------------------------------------------------------
 * environment
 * --------------------------------------------------------------------------
 * Used externally
 */

export const environment = {
	// Mode
	production: false,

	// Name of the app
	appName: 'Sud Paris',

	// httpOptions
	httpOptions: {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	},









	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * User URLs
	 * --------------------------------------------------------------------------
	 */

	userCreateURL: 					userBaseURL+'/create',

	userLoginURL:					userBaseURL+'/login',
	userLogoutURL: 					userBaseURL+'/logout',

	userGetAllURL:					userBaseURL+'/getAll',
	userGetURL:						userBaseURL+'/get',				// + /id

	userUpdateURL:					userBaseURL+'/update',			// + /id

	userDeleteURL:					userBaseURL+'/delete',			// + /id
}