import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteComponent } from "../../components"
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PasswordComponent } from './password/password.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';

export const otherPageRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
	    component: SiteComponent,
        children: [
			{
	            path: 'user-detail',
	            component: UserDetailComponent
	        },
			{
	            path: 'password',
	            component: PasswordComponent
	        },
			{
	            path: 'personal-data',
	            component: PersonalDataComponent
	        }
			
        ]
    }
]);