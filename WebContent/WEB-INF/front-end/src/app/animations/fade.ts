import { trigger, state, transition, animate, style } from '@angular/animations';

export const fade = trigger('fade', [
	state('void', style({
		opacity: 0,
		top: 8
	})),
	transition('void => *', [
		animate('600ms cubic-bezier(.58, .71, .33, 1)')
	])
]);