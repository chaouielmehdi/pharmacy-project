/**
 * --------------------------------------------------------------------------
 * Medicine class
 * --------------------------------------------------------------------------
 * This class represent a shape of a medicine object
 * 
 * A table in database : YES
 */

export class Medicine {
	
	public constructor(
		public id?: 						number,
		public name?: 						string,
		public expirationDate?: 			string,
		public unitPrice?: 					number,
		public idProvider?: 				string,
		public quantity?: 					number,
	) { }
	
}
