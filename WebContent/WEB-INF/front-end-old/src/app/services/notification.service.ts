import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	constructor() {	}

	info(message: string){
		this.showNotification('top', 'right', 'info', message);
	}

	success(message: string){
		this.showNotification('top', 'right', 'success', message);
	}

	warning(message: string){
		this.showNotification('top', 'right', 'warning', message);
	}

	danger(message: string){
		this.showNotification('top', 'right', 'danger', message);
	}

	showNotification(from, align, type, message){

		let icon = 'notifications';

		switch (type) {
			case 'info':
				icon = 'info';
				break;

			case 'success':
				icon = 'check_circle';
				break;
			
			case 'warning':
				icon = 'info';
				break;

			case 'danger':
				icon = 'error';
				break;
		
			default:
				icon = 'notifications';
				break;
		}

		$.notify({
			message: message
		},{
			type: type,
			timer: 50,
			placement: {
				from: from,
				align: align
			},
			template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
			  '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
			  '<i class="material-icons" data-notify="icon">'+icon+'</i> ' +
			  '<span data-notify="title">{1}</span> ' +
			  '<span data-notify="message">{2}</span>' +
			  '<div class="progress" data-notify="progressbar">' +
				'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
			  '</div>' +
			  '<a href="{3}" target="{4}" data-notify="url"></a>' +
			'</div>'
		});
	}


}
