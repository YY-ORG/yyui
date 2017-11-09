import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteComponent } from "../../components"
import { UserDetailComponent } from './user-detail/user-detail.component';

export const otherPageRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
	    component: SiteComponent,
        children: [
			{
	            path: 'user-detail',
	            component: UserDetailComponent
	        }
			
        ]
    }
]);