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

// Provider Base URL
export const providerBaseURL =					baseApiURL+'/providers';

// Medicine Base URL
export const medicineBaseURL =					baseApiURL+'/medicines';

// Transaction Base URL
export const transactionBaseURL =				baseApiURL+'/transactions';








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








	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * Provider URLs
	 * --------------------------------------------------------------------------
	 */

	providerCreateURL: 					providerBaseURL+'/create',

	providerLoginURL:					providerBaseURL+'/login',
	providerLogoutURL: 					providerBaseURL+'/logout',

	providerGetAllURL:					providerBaseURL+'/getAll',
	providerGetURL:						providerBaseURL+'/get',				// + /id

	providerUpdateURL:					providerBaseURL+'/update',			// + /id

	providerDeleteURL:					providerBaseURL+'/delete',			// + /id








	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * Medicine URLs
	 * --------------------------------------------------------------------------
	 */

	medicineCreateURL: 					medicineBaseURL+'/create',

	medicineGetAllURL:					medicineBaseURL+'/getAll',
	medicineGetURL:						medicineBaseURL+'/get',				// + /id

	medicineUpdateURL:					medicineBaseURL+'/update',			// + /id

	medicineDeleteURL:					medicineBaseURL+'/delete',			// + /id






	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * Transaction URLs
	 * --------------------------------------------------------------------------
	 */

	transactionCreateURL: 				transactionBaseURL+'/create',

}