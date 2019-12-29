/**
 * --------------------------------------------------------------------------
 * Statistic class
 * --------------------------------------------------------------------------
 * This class represent a shape of a Statistic object
 * 
 * A table in database : NO
 */

export class Statistic {

	public constructor(
		public revenue?: 						number,
		public providersNumber?:				number,
		public usersNumber?:					number,
		public dailySales?:						{ date: string, value: number }[],
		public purchasesPerProviders?:			{ providerName: string, value: number }[],
	) { }

}
