/**
 * --------------------------------------------------------------------------
 * Transaction class
 * --------------------------------------------------------------------------
 * This class represent a shape of a transaction object
 * 
 * A table in database : YES
 */

export class Transaction {
	
	public constructor(
		public id?: 						number,
		public type?: 						string,	// sell or buy
		public date?: 						Date,
		public idMedicine?: 				number,
		public idProvider?: 				number,
		public idUser?: 					number,
		public quantity?: 					number,
	) { }
	
}
