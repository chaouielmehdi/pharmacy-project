import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { BeforeLoginGuard } from 'app/guards/before-login.guard';
import { AfterLoginGuard } from 'app/guards/after-login.guard';
import { UserEditComponent } from 'app/components/user/user-edit/user-edit.component';
import { UserAddComponent } from 'app/components/user/user-add/user-add.component';
import { UsersComponent } from 'app/components/user/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user/user-profile-edit/user-profile-edit.component';
import { ProviderEditComponent } from './components/provider/provider-edit/provider-edit.component';
import { ProviderAddComponent } from './components/provider/provider-add/provider-add.component';
import { ProvidersComponent } from './components/provider/providers/providers.component';
import { MedicinesComponent } from './components/medicine/medicines/medicines.component';
import { MedicineAddComponent } from './components/medicine/medicine-add/medicine-add.component';
import { MedicineEditComponent } from './components/medicine/medicine-edit/medicine-edit.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
		canActivate: [BeforeLoginGuard]
	},
    {
		path: 'login',
		component: LoginComponent,
		canActivate: [BeforeLoginGuard]
	},
    {
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AfterLoginGuard]
	},



	// users management
    {
		path: 'users',
		component: UsersComponent,
		canActivate: [AfterLoginGuard]
	},
    {
		path: 'user/add',
		component: UserAddComponent,
		canActivate: [AfterLoginGuard]
	},
    {
		path: 'user/edit/:id',
		component: UserEditComponent,
		canActivate: [AfterLoginGuard]
	},
    {
		path: 'profile',
		component: UserProfileComponent,
		canActivate: [AfterLoginGuard]
	},
    {
		path: 'profile/edit',
		component: UserProfileEditComponent,
		canActivate: [AfterLoginGuard]
	},

	

	// providers management
    {
		path: 'providers',
		component: ProvidersComponent,
		canActivate: [AfterLoginGuard]
	},
    {
		path: 'provider/add',
		component: ProviderAddComponent,
		canActivate: [AfterLoginGuard]
	},
    {
		path: 'provider/edit/:id',
		component: ProviderEditComponent,
		canActivate: [AfterLoginGuard]
	},




	// medicines management
    {
		path: 'medicines',
		component: MedicinesComponent,
		canActivate: [AfterLoginGuard]
	},
    {
		path: 'medicine/add',
		component: MedicineAddComponent,
		canActivate: [AfterLoginGuard]
	},
    {
		path: 'medicine/edit/:id',
		component: MedicineEditComponent,
		canActivate: [AfterLoginGuard]
	},






	// default path
	{
		path: '**',
		redirectTo: '/login',
		canActivate: [BeforeLoginGuard]
	},


];

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule.forRoot(routes)
	],
	exports: [
		routes
	]
})
export class AppRoutingModule { }
