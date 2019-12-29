import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Statistic } from 'app/classes/Statistic';

@Injectable({
	providedIn: 'root'
})
export class StatisticService {

	constructor(
		private http: HttpClient,
	) {
	}



	/**
	 * Gets statistic
	 * @returns statistic$
	 */
	get(): Observable<Statistic> {
		// console.log(`StatisticService => trying to getConnected`);

		return this.http.get<Statistic>(environment.statisticGetURL).pipe(
			tap((user: Statistic) => {
				// console.log(`StatisticService => got user = `, user)
			}),
			catchError((error) => {
				// console.log(`StatisticService => error = `, error);
				return of(null);
			})
		);
	}


}
