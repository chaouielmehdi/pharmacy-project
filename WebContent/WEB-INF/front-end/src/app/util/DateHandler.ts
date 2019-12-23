
/**
 * --------------------------------------------------------------------------
 * formatDate
 * --------------------------------------------------------------------------
 * @param date
 * @returns formatedDate 
 */

export function formatDate(format: string, date: Date | string, daysToAdd: number = 1): string {
	let monthNames = [
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
	];

	let monthIndex	= new Date(date).getMonth()+1;
	let year		= new Date(date).getFullYear();
	let month		= monthIndex < 10 ?
						'0' + monthIndex :
						monthIndex ;
	let day			= (new Date(date).getDate() + daysToAdd) < 10 ?
						'0' + (new Date(date).getDate() + daysToAdd) :
						(new Date(date).getDate() + daysToAdd);
	
	switch (format) {
		case 'Month yyyy':
			return monthNames[monthIndex-1] + ' ' + year;

		case 'MM/yyyy':
			return month + '/' + year;
			
		case 'Month dd, yyyy':
			return monthNames[monthIndex-1] + ' ' + day + ', ' + year;
			
		case 'dd/mm/yyyy':
			return day + '/' + month + '/' + year;

		case 'yyyy/mm/dd':
			return year + '/' + month + '/' + day;
		
		case 'yyyy-mm-dd':
			return year + '-' + month + '-' + day;
		
		default:
			return monthNames[monthIndex-1] + ' ' + year;
	}
}
