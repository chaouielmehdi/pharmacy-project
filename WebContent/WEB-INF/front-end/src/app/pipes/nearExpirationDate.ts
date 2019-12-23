import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nearExpirationDate' })
export class NearExpirationDate implements PipeTransform {
	transform(expirationDate: string) {
		let diffDays = msToDays((new Date(expirationDate).getTime() - new Date().getTime()));
		return diffDays < 30;
	}

}

export function msToDays(ms): number{
	let days = Math.floor(ms / (24*60*60*1000));
	return days;
}