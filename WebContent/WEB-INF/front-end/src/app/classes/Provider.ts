/**
 * --------------------------------------------------------------------------
 * Provider class
 * --------------------------------------------------------------------------
 * This class represent a shape of a provider object
 * 
 * A table in database : YES
 */

export class Provider {
	
	public constructor(
		public id?: 						string,
		public name?: 						string,
		public city?: 						string,
		public contractDate?: 				string,
	) { }
}
