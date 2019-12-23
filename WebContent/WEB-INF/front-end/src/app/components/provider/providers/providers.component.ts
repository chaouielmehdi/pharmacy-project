import { Component, OnInit } from '@angular/core';
import { Provider } from 'app/classes/Provider';
import { ProviderService } from 'app/services/provider.service';
import { NotificationService } from 'app/services/notification.service';
import { Router } from '@angular/router';
import { fade } from 'app/animations/fade';
import { formatDate } from 'app/util/DateHandler';

@Component({
	selector: 'app-providers',
	templateUrl: './providers.component.html',
	styleUrls: ['./providers.component.css'],
	animations: [ fade ]
})
export class ProvidersComponent implements OnInit {

	isPageLoading: boolean = true;

	constructor(
		private _providerService: ProviderService,
		private _notificationService: NotificationService,
		private router: Router
	) { }

	ngOnInit() {
		// get all providers
		this.getAllProviders();
	}






	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * providers
	 * --------------------------------------------------------------------------
	 */
	
	providers: Provider[] = [];
	
	getAllProviders(): void {
		this._providerService.getAll().subscribe(
			(providers) => {
				if(providers != null) {
					this.providers = providers;

					this.providers.forEach((provider) => {
						provider.contractDate = formatDate('Month dd, yyyy', provider.contractDate);
					});
				}
			},
			(error) => {
				this._notificationService.danger('Aïe! an error has occurred');
				// console.error(error);
			},
			() => {
				this.isPageLoading = false;
			});
	}

	edit(id: number){
		this.router.navigateByUrl('provider/edit/' + id);
	}

}
