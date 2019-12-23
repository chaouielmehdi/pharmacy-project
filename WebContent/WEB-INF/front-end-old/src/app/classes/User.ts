/**
 * --------------------------------------------------------------------------
 * User class
 * --------------------------------------------------------------------------
 * This class represent a shape of a user object
 * 
 * A table in database : YES
 */

export class User {
	
	public constructor(
		public id?: 						string,
		public username?: 					string,
		public password?: 					string,
		public type?: 						string,
		public firstName?: 					string,
		public lastName?: 					string,
		public cin?: 						string,
		public phone?: 						string,
		public description?: 				string,
	) { }
	
}
