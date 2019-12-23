import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UserAddComponent } from 'app/components/user/user-add/user-add.component';
import { UserEditComponent } from 'app/components/user/user-edit/user-edit.component';
import { UsersComponent } from 'app/components/user/users/users.component';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { UserProfileEditComponent } from './components/user/user-profile-edit/user-profile-edit.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { ProvidersComponent } from './components/provider/providers/providers.component';
import { ProviderAddComponent } from './components/provider/provider-add/provider-add.component';
import { ProviderEditComponent } from './components/provider/provider-edit/provider-edit.component';
import { MedicinesComponent } from './components/medicine/medicines/medicines.component';
import { MedicineAddComponent } from './components/medicine/medicine-add/medicine-add.component';
import { MedicineEditComponent } from './components/medicine/medicine-edit/medicine-edit.component';
import { NearExpirationDate } from './pipes/nearExpirationDate';
import { EmptyService } from './services/empty.service';


@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		SharedModule,
		HttpClientModule,
		CommonModule,
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
		// general
		AppComponent,
		LoginComponent,
		DashboardComponent,
		NearExpirationDate,

		// users management
		UsersComponent,
		UserAddComponent,
		UserEditComponent,
		UserProfileComponent,
		UserProfileEditComponent,

		// providers management
		ProvidersComponent,
		ProviderAddComponent,
		ProviderEditComponent,

		// medicines management
		MedicinesComponent,
		MedicineAddComponent,
		MedicineEditComponent,
	],
	providers: [
		EmptyService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
