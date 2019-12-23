import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from '../../login/login.component';
import { BeforeLoginGuard } from 'app/guards/before-login.guard';
import { AfterLoginGuard } from 'app/guards/after-login.guard';
import { UserEditComponent } from 'app/user-edit/user-edit.component';
import { UserAddComponent } from 'app/user-add/user-add.component';
import { UsersComponent } from 'app/users/users.component';

export const AdminLayoutRoutes: Routes = [
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
    {
		path: 'users',
		component: UsersComponent,
		canActivate: [AfterLoginGuard]
	},
    {
		path: 'user/edit/:id',
		component: UserEditComponent,
		canActivate: [AfterLoginGuard]
	},
    {
		path: 'user/add',
		component: UserAddComponent,
		canActivate: [AfterLoginGuard]
	},
	{
		path: '**',
		redirectTo: '/login',
		canActivate: [BeforeLoginGuard]
	}
];
