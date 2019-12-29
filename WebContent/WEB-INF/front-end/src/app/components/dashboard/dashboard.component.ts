import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { User } from 'app/classes/User';
import { UserService } from 'app/services/user.service';
import { StatisticService } from 'app/services/statistic.service';
import { fade } from 'app/animations/fade';
import { Statistic } from 'app/classes/Statistic';
import { formatDate } from 'app/util/DateHandler';
import { ProviderService } from 'app/services/provider.service';
import { NotificationService } from 'app/services/notification.service';
import { Provider } from 'app/classes/Provider';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	animations: [ fade ]
})
export class DashboardComponent implements OnInit {

	isPageLoading: boolean = true;

	user: User = new User();
	isUserConnected: boolean = false;
	isAdmin: boolean = false;
	
	constructor(
		private _userService: UserService,
		private _statisticService: StatisticService,
		private _providerService: ProviderService,
		private _notificationService: NotificationService,
	) { }

	ngOnInit() {
		// subscribe to the isUserConnected
		this._userService.authStatus$.subscribe(
			(status) => {
				this.isUserConnected = status;
			}
		);
		
		this._userService.getAndEmitConnectedUser();
		
		// Subscription to userEventEmitter
		this._userService.userEventEmitter.subscribe((user) => {
			this.user = user;
			this.isAdmin = (this.user.type === 'admin');
		});

		// get providers
		this.getAllProviders();
	}


	
	/*
	 * (non-doc)
	 * --------------------------------------------------------------------------
	 * statistic
	 * --------------------------------------------------------------------------
	 */

	statistic: Statistic = new Statistic();
	dailySalesChart = null;
	purchasesPerProvidersChart = null;

	/**
	 * Gets and emit connected statistic to the subscribers of this.statisticEventEmitter
	 */
	getStatistic(): void {
		this._statisticService.get().subscribe(
			(statistic) => {
				if(statistic != null) {
					this.statistic = statistic;

					console.log(this.statistic);
					
					this.setDailySalesChart();
					this.setPurchasesPerProvidersChart();
				}
				else {
					// statistic is not there
					this.statistic = new Statistic();
				}
			},
			(error) => {
				// statistic is not there
				this.statistic = new Statistic();
				// console.log("error : ", error);
			},
			() => {
				this.isPageLoading = false;





				// /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
				

				const optionsDailySalesChart: any = {
					lineSmooth: Chartist.Interpolation.cardinal({
						tension: 0
					}),
					low: 0,
					high: 150, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
					chartPadding: { top: 0, right: 20, bottom: 0, left: 0},
				}

				var dailySalesChart = new Chartist.Line('#dailySalesChart', this.dailySalesChart, optionsDailySalesChart);

				this.startAnimationForLineChart(dailySalesChart);


				/* ----------==========     Purchases Per Providers Chart initialization    ==========---------- */

				const dataCompletedTasksChart: any = {
					labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
					series: [
						[230, 750, 450, 300, 280, 240, 200, 190]
					]
				};

				const optionsCompletedTasksChart: any = {
					lineSmooth: Chartist.Interpolation.cardinal({
						tension: 0
					}),
					low: 0,
					high: 40, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
					chartPadding: { top: 0, right: 20, bottom: 0, left: 0}
				}

				var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

				// start animation for the Completed Tasks Chart - Line Chart
				this.startAnimationForLineChart(completedTasksChart);



				/* ----------==========     Emails Subscription Chart initialization    ==========---------- */

				var optionswebsiteViewsChart = {
					axisX: {
						showGrid: false
					},
					low: 0,
					high: 40,
					chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
				};
				var responsiveOptions: any[] = [
					['screen and (max-width: 640px)', {
					seriesBarDistance: 5,
					axisX: {
						labelInterpolationFnc: function (value) {
						return value[0];
						}
					}
					}]
				];
				var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', this.purchasesPerProvidersChart, optionswebsiteViewsChart, responsiveOptions);

				//start animation for the Emails Subscription Chart
				this.startAnimationForBarChart(websiteViewsChart);
			});
	}

	setDailySalesChart(){

		let labelsForComparison = [];
		let labels = [];
		let series = [];
		
		for (let index = 0; index < 7; index++) {
			labelsForComparison[index] = formatDate('yyyy-mm-dd', new Date(), -index-1);
			labels[index] = formatDate('yyyy-mm-dd', new Date(), -index);
			
			if(this.statistic.dailySales[labelsForComparison[index]] != undefined){
				series[index] = this.statistic.dailySales[labelsForComparison[index]];
			}
			else{
				series[index] = 0;
			}
		}

		// set the chart
		this.dailySalesChart = {
			labels: labels,
			series: [
				series
			]
		};
	}

	setPurchasesPerProvidersChart(){

		let labels = [];
		let series = [];
		
		let index = 0;
		this.providers.forEach((provider) => {
			console.log(this.statistic.purchasesPerProviders[provider.name]);
			
			if(this.statistic.purchasesPerProviders[provider.name] != undefined){
				series[index] = this.statistic.purchasesPerProviders[provider.name];
				labels[index] = provider.name;
				index++;
			}
		});

		// set the chart
		this.purchasesPerProvidersChart = {
			labels: labels,
			series: [
				series
			]
		};
	}



	startAnimationForLineChart(chart){
		let seq: any, delays: any, durations: any;
		seq = 0;
		delays = 80;
		durations = 500;

		chart.on('draw', function(data) {
			if(data.type === 'line' || data.type === 'area') {
			data.element.animate({
				d: {
					begin: 600,
					dur: 700,
					from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
					to: data.path.clone().stringify(),
					easing: Chartist.Svg.Easing.easeOutQuint
				}
			});
			} else if(data.type === 'point') {
				seq++;
				data.element.animate({
					opacity: {
					begin: seq * delays,
					dur: durations,
					from: 0,
					to: 1,
					easing: 'ease'
				}});
			}
		});

		seq = 0;
	}

	startAnimationForBarChart(chart){
		let seq2: any, delays2: any, durations2: any;

		seq2 = 0;
		delays2 = 80;
		durations2 = 500;
		chart.on('draw', function(data) {
			if(data.type === 'bar'){
				seq2++;
				data.element.animate({
					opacity: {
						begin: seq2 * delays2,
						dur: durations2,
						from: 0,
						to: 1,
						easing: 'ease'
					}});
			}
		});

		seq2 = 0;
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

					// get statistic
					this.getStatistic();
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


}
