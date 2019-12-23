import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from '../../login/login.component';

import {
	MatButtonModule,
	MatInputModule,
	MatRippleModule,
	MatFormFieldModule,
	MatTooltipModule,
	MatSelectModule
} from '@angular/material';
import { LoaderComponent } from 'app/loader/loader.component';
import { UserEditComponent } from 'app/user-edit/user-edit.component';
import { UserAddComponent } from 'app/user-add/user-add.component';
import { UsersComponent } from 'app/users/users.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(AdminLayoutRoutes),
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatRippleModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatTooltipModule,
	],
	declarations: [
		DashboardComponent,
		UsersComponent,
		LoaderComponent,
		LoginComponent,
		UserEditComponent,
		UserAddComponent,
	]
})

export class AdminLayoutModule {}
